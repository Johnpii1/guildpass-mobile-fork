// GuildPass Mobile: Import package module dependencies.
import { Redirect } from "expo-router";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useWallet } from "../src/features/wallet/useWallet";

// GuildPass Mobile: Exposed interface structure for local navigation layouts.
export default function Index() {
  // GuildPass Mobile: Local UI-scoped constant or state representation.
  const { isConnected } = useWallet();

  // GuildPass Mobile: Validate screen variables or params before routing.
  if (!isConnected) {
    // GuildPass Mobile: Return evaluated JSX layout or callback response.
    return <Redirect href="/onboarding" />;
    // GuildPass Mobile: Exit functional execution container scope block.
  }

  // GuildPass Mobile: Terminate block execution context and send back value.
  return <Redirect href="/profile" />;
  // GuildPass Mobile: Exit functional execution container scope block.
}
