import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ACCESS_DENIED_FIXTURE, ACCESS_GRANTED_FIXTURE } from "./fixtures/access.fixtures";
import AccessCheck from "../app/access-check";
import { useAccessHistoryStore } from "../src/features/access/accessHistory.store";

const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
  back: vi.fn(),
}));

const guildPassClientMock = vi.hoisted(() => ({
  checkAccess: vi.fn(),
}));

const storage = vi.hoisted(() => new Map<string, string>());

vi.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  ScrollView: "ScrollView",
  TextInput: "TextInput",
  TouchableOpacity: "TouchableOpacity",
  ActivityIndicator: "ActivityIndicator",
  SafeAreaView: "SafeAreaView",
}));

vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(async (key: string) => storage.get(key) ?? null),
    setItem: vi.fn(async (key: string, value: string) => {
      storage.set(key, value);
    }),
    removeItem: vi.fn(async (key: string) => {
      storage.delete(key);
    }),
  },
}));

vi.mock("../src/lib/guildpassClient", () => ({
  guildPassClient: {
    access: {
      checkAccess: guildPassClientMock.checkAccess,
    },
  },
}));

vi.mock("expo-constants", () => ({ default: { expoConfig: { extra: {} } } }));

vi.mock("expo-router", () => ({
  useRouter: () => ({ push: routerMocks.push, back: routerMocks.back }),
  useLocalSearchParams: () => ({}),
}));

vi.mock("../src/features/wallet/useWallet", () => ({
  useWallet: () => ({
    walletAddress: "0x1234567890123456789012345678901234567890",
    isConnected: true,
  }),
}));

const renderScreen = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return TestRenderer.create(
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(AccessCheck),
    ),
  );
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const outputText = (renderer: ReactTestRenderer) => JSON.stringify(renderer.toJSON());

describe("AccessCheck screen", () => {
  beforeEach(() => {
    storage.clear();
    vi.clearAllMocks();
    guildPassClientMock.checkAccess.mockReset().mockResolvedValue(ACCESS_GRANTED_FIXTURE);
    useAccessHistoryStore.setState({ historyByWallet: {}, hydrated: true });
  });

  it("clears the previous result when inputs change after a completed check", async () => {
    guildPassClientMock.checkAccess.mockResolvedValueOnce(ACCESS_GRANTED_FIXTURE);

    let screen: ReactTestRenderer;

    await act(async () => {
      screen = renderScreen();
    });

    await act(async () => {
      screen.root
        .findByProps({ testID: "access-check-guild-id-input" })
        .props.onChangeText("guild-alpha");
      screen.root
        .findByProps({ testID: "access-check-resource-id-input" })
        .props.onChangeText("vip-door");
    });

    await act(async () => {
      screen.root.findByProps({ accessibilityLabel: "Check Access" }).props.onPress();
      await flush();
    });

    expect(outputText(screen!)).toContain("Access Granted");

    await act(async () => {
      screen.root
        .findByProps({ testID: "access-check-resource-id-input" })
        .props.onChangeText("members-room");
    });

    expect(outputText(screen!)).not.toContain("Access Granted");
  });

  it("records denied checks in recent history", async () => {
    guildPassClientMock.checkAccess.mockResolvedValueOnce(ACCESS_DENIED_FIXTURE);

    let screen: ReactTestRenderer;

    await act(async () => {
      screen = renderScreen();
    });

    await act(async () => {
      screen.root
        .findByProps({ testID: "access-check-guild-id-input" })
        .props.onChangeText("guild-alpha");
      screen.root
        .findByProps({ testID: "access-check-resource-id-input" })
        .props.onChangeText("vip-door");
    });

    await act(async () => {
      screen.root.findByProps({ accessibilityLabel: "Check Access" }).props.onPress();
      await flush();
    });

    expect(outputText(screen!)).toContain("Access Denied");
    expect(outputText(screen!)).toContain("Recent Access Checks");
    expect(outputText(screen!)).toContain("vip-door");
    expect(outputText(screen!)).toContain("Denied");
  });
});
