// GuildPass Mobile: Import package module dependencies.
import { QueryClient } from "@tanstack/react-query";

// GuildPass Mobile: Exported screen, component definition, or state hooks.
export const queryClient = new QueryClient({
  // GuildPass Mobile: Enter functional execution container scope block.
  defaultOptions: {
    // GuildPass Mobile: Enter functional execution container scope block.
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      // GuildPass Mobile: Exit functional execution container scope block.
    },
    // GuildPass Mobile: Exit functional execution container scope block.
  },
  // GuildPass Mobile: Exit functional execution container scope block.
});
