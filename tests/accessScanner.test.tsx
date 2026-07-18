import React from "react";
import TestRenderer, { type ReactTestRenderer } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCameraPermissions } from "expo-camera";
import AccessScanner from "../app/access-scanner";

vi.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  ScrollView: "ScrollView",
  TextInput: "TextInput",
  TouchableOpacity: "TouchableOpacity",
  ActivityIndicator: "ActivityIndicator",
  SafeAreaView: "SafeAreaView",
  StyleSheet: { create: (styles: Record<string, unknown>) => styles },
}));

const routerMocks = vi.hoisted(() => ({
  replace: vi.fn(),
  back: vi.fn(),
}));

vi.mock("expo-router", () => ({
  useRouter: () => ({
    replace: routerMocks.replace,
    back: routerMocks.back,
  }),
}));

vi.mock("expo-camera", () => ({
  Camera: () => null,
  CameraType: { back: "back", front: "front" },
  useCameraPermissions: vi.fn(),
}));

vi.mock("expo-camera/legacy", () => ({
  Camera: () => null,
  CameraType: { back: "back" },
}));

vi.mock("../src/features/access/qrPayload", () => ({
  parseAccessQrPayload: vi.fn(),
}));

const screenText = (renderer: ReactTestRenderer) => JSON.stringify(renderer.toJSON());

describe("AccessScanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while checking permission", () => {
    vi.mocked(useCameraPermissions).mockReturnValue([null, vi.fn()]);

    const renderer = TestRenderer.create(<AccessScanner />);

    expect(screenText(renderer)).toContain("Checking camera permission...");
  });

  it("shows permission request when camera not granted and can ask again", () => {
    vi.mocked(useCameraPermissions).mockReturnValue([
      { granted: false, canAskAgain: true },
      vi.fn(),
    ]);

    const renderer = TestRenderer.create(<AccessScanner />);

    expect(screenText(renderer)).toContain("Allow Camera Access");
  });

  it("shows permanent denial message when camera denied and cannot ask again", () => {
    vi.mocked(useCameraPermissions).mockReturnValue([
      { granted: false, canAskAgain: false },
      vi.fn(),
    ]);

    const renderer = TestRenderer.create(<AccessScanner />);

    expect(screenText(renderer)).toContain(
      "Enable camera access in your device settings to scan QR codes.",
    );
  });

  it("shows scanner view when permission is granted", () => {
    vi.mocked(useCameraPermissions).mockReturnValue([
      { granted: true, canAskAgain: true },
      vi.fn(),
    ]);

    const renderer = TestRenderer.create(<AccessScanner />);

    expect(screenText(renderer)).toContain("Point your camera at a GuildPass access QR code.");
  });
});
