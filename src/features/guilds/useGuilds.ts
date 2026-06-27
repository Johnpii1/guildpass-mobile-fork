import { useQuery } from "@tanstack/react-query";
import { guildPassClient } from "../../lib/guildpassClient";

export const useGuilds = () => {
  const useGuild = (guildId: string) => {
    return useQuery({
      queryKey: ["guild", guildId],
      queryFn: () => guildPassClient.guilds.getGuild({ guildId }),
      enabled: !!guildId,
      networkMode: "offlineFirst",
    });
  };

  const useGuildConfig = (guildId: string) => {
    return useQuery({
      queryKey: ["guild-config", guildId],
      queryFn: () => guildPassClient.guilds.getGuildConfig({ guildId }),
      enabled: !!guildId,
      networkMode: "offlineFirst",
    });
  };

  const useRoles = (guildId: string) => {
    return useQuery({
      queryKey: ["guild-roles", guildId],
      queryFn: () => guildPassClient.roles.getRoles({ guildId }),
      enabled: !!guildId,
      networkMode: "offlineFirst",
    });
  };

  return {
    getGuild: useGuild,
    getGuildConfig: useGuildConfig,
    getRoles: useRoles,
    useGuild,
    useGuildConfig,
    useRoles,
  };
};
