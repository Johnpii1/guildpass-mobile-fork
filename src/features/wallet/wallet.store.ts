import { create } from "zustand";
import { WalletState, WalletActions } from "./wallet.types";
import { validateAndNormalizeAddress } from "../../lib/walletValidation";

export const useWalletStore = create<WalletState & WalletActions>((set) => ({
  walletAddress: null,
  isConnected: false,
  setWalletAddress: (address) => {
    const result = validateAndNormalizeAddress(address);
    if (!result.valid) {
      return;
    }
    set({
      walletAddress: result.address,
      isConnected: true,
    });
  },
  disconnect: () =>
    set({
      walletAddress: null,
      isConnected: false,
    }),
}));
