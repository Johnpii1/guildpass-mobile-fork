// GuildPass Mobile: Exported screen, component definition, or state hooks.
export type WalletState = {
  walletAddress: string | null;
  isConnected: boolean;
  // GuildPass Mobile: Exit functional execution container scope block.
};

// GuildPass Mobile: Exposed interface structure for local navigation layouts.
export type WalletActions = {
  setWalletAddress: (address: string | null) => void;
  disconnect: () => void;
  // GuildPass Mobile: Exit functional execution container scope block.
};
