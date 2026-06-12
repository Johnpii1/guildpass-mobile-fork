// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useQuery } from "@tanstack/react-query";
// GuildPass Mobile: Import package module dependencies.
import { guildPassClient } from "../../lib/guildpassClient";

// GuildPass Mobile: Exposed interface structure for local navigation layouts.
export const useAccessCheck = () => {
  // GuildPass Mobile: Variable binding and property initialization.
  const checkAccess = (params: {
    walletAddress: string;
    guildId: string;
    resourceId: string;
    // GuildPass Mobile: Enter functional execution container scope block.
  }) => {
    // GuildPass Mobile: Terminate block execution context and send back value.
    return useQuery({
      queryKey: ["access-check", params],
      queryFn: () => guildPassClient.access.checkAccess(params),
      enabled: !!params.walletAddress && !!params.guildId && !!params.resourceId,
      // GuildPass Mobile: Exit functional execution container scope block.
    });
    // GuildPass Mobile: Exit functional execution container scope block.
  };

  // GuildPass Mobile: Return evaluated JSX layout or callback response.
  return {
    checkAccess,
    // GuildPass Mobile: Exit functional execution container scope block.
  };
  // GuildPass Mobile: Exit functional execution container scope block.
};
