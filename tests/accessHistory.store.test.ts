import { beforeEach, describe, expect, it, vi } from "vitest";
import { ACCESS_DENIED_FIXTURE, ACCESS_GRANTED_FIXTURE } from "./fixtures/access.fixtures";
import {
  ACCESS_HISTORY_STORAGE_KEY,
  useAccessHistoryStore,
} from "../src/features/access/accessHistory.store";
import { resetAppState } from "../src/lib/resetAppState";

const storage = vi.hoisted(() => new Map<string, string>());

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

const WALLET_A = "0x1234567890123456789012345678901234567890";
const WALLET_B = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd";

describe("access history store", () => {
  beforeEach(() => {
    storage.clear();
    useAccessHistoryStore.setState({ historyByWallet: {}, hydrated: false });
  });

  it("stores successful and denied checks under the checked wallet only", async () => {
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_A,
      guildId: "guild-alpha",
      resourceId: "vip-door",
      result: ACCESS_GRANTED_FIXTURE,
    });
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_B,
      guildId: "guild-alpha",
      resourceId: "vip-door",
      result: ACCESS_DENIED_FIXTURE,
    });

    const walletAHistory = useAccessHistoryStore.getState().getHistoryForWallet(WALLET_A);
    const walletBHistory = useAccessHistoryStore.getState().getHistoryForWallet(WALLET_B);

    expect(walletAHistory).toHaveLength(1);
    expect(walletAHistory[0]).toMatchObject({
      walletAddress: WALLET_A.toLowerCase(),
      guildId: "guild-alpha",
      resourceId: "vip-door",
      status: "granted",
      reason: ACCESS_GRANTED_FIXTURE.reason,
    });
    expect(walletBHistory).toHaveLength(1);
    expect(walletBHistory[0]).toMatchObject({
      walletAddress: WALLET_B.toLowerCase(),
      status: "denied",
      reason: ACCESS_DENIED_FIXTURE.reason,
    });
    expect(storage.has(ACCESS_HISTORY_STORAGE_KEY)).toBe(true);
  });

  it("clears history for one wallet without touching another wallet", async () => {
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_A,
      guildId: "guild-alpha",
      resourceId: "vip-door",
      result: ACCESS_GRANTED_FIXTURE,
    });
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_B,
      guildId: "guild-beta",
      resourceId: "members-room",
      result: ACCESS_DENIED_FIXTURE,
    });

    await useAccessHistoryStore.getState().clearWalletHistory(WALLET_A);

    expect(useAccessHistoryStore.getState().getHistoryForWallet(WALLET_A)).toStrictEqual([]);
    expect(useAccessHistoryStore.getState().getHistoryForWallet(WALLET_B)).toHaveLength(1);
  });

  it("stores generic error history without raw failure details", async () => {
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_A,
      guildId: "guild-alpha",
      resourceId: "vip-door",
      error: new Error("Authorization: Bearer secret-token"),
    });

    const [entry] = useAccessHistoryStore.getState().getHistoryForWallet(WALLET_A);

    expect(entry).toMatchObject({
      status: "error",
      reason: "Access check failed. Please try again.",
      matchedRoles: [],
      requiredRoles: [],
    });
    expect(JSON.stringify(entry)).not.toMatch(/secret-token/i);
    expect(JSON.stringify(entry)).not.toMatch(/authorization/i);
  });

  it("resetAppState clears all stored access history", async () => {
    await useAccessHistoryStore.getState().recordCheck({
      walletAddress: WALLET_A,
      guildId: "guild-alpha",
      resourceId: "vip-door",
      result: ACCESS_GRANTED_FIXTURE,
    });

    await resetAppState();

    expect(useAccessHistoryStore.getState().getHistoryForWallet(WALLET_A)).toStrictEqual([]);
    expect(storage.has(ACCESS_HISTORY_STORAGE_KEY)).toBe(false);
  });
});
