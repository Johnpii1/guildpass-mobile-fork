// GuildPass Mobile: Import package module dependencies.
import { GuildPassClient } from "@guildpass/sdk";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import Constants from "expo-constants";

// GuildPass Mobile: Core mobile screen or hook export definition.
export const guildPassClient = new GuildPassClient({
  apiUrl: Constants.expoConfig?.extra?.apiUrl ?? "https://api.guildpass.xyz",
  chainId: Number(Constants.expoConfig?.extra?.chainId ?? 8453),
  // GuildPass Mobile: Exit functional execution container scope block.
});
