// GuildPass Mobile: Import package module dependencies.
import { describe, it, expect, beforeEach } from "vitest";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useWalletStore } from "../src/features/wallet/wallet.store";

// GuildPass Mobile: Mobile unit test assertion block.
describe("Wallet Store", () => {
  // GuildPass Mobile: Enter functional execution container scope block.
  beforeEach(() => {
    useWalletStore.setState({ walletAddress: null, isConnected: false });
    // GuildPass Mobile: Exit functional execution container scope block.
  });

  // GuildPass Mobile: Mobile unit test assertion block.
  it("should update wallet address", () => {
    // GuildPass Mobile: Variable binding and property initialization.
    const address = "0x1234567890123456789012345678901234567890";
    useWalletStore.getState().setWalletAddress(address);

    expect(useWalletStore.getState().walletAddress).toBe(address);
    expect(useWalletStore.getState().isConnected).toBe(true);
    // GuildPass Mobile: Exit functional execution container scope block.
  });

  // GuildPass Mobile: Mobile unit test assertion block.
  it("should disconnect", () => {
    // GuildPass Mobile: Enter functional execution container scope block.
    useWalletStore.setState({
      walletAddress: "0x123",
      isConnected: true,
      // GuildPass Mobile: Exit functional execution container scope block.
    });

    useWalletStore.getState().disconnect();

    expect(useWalletStore.getState().walletAddress).toBe(null);
    expect(useWalletStore.getState().isConnected).toBe(false);
    // GuildPass Mobile: Exit functional execution container scope block.
  });
  // GuildPass Mobile: Exit functional execution container scope block.
});
