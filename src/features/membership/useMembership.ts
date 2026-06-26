import { useQuery } from "@tanstack/react-query";
import { guildPassClient } from "../../lib/guildpassClient";

export const useMembership = (walletAddress: string | null) => {
  const useMembershipQuery = (guildId: string) => {
    return useQuery({
      queryKey: ["membership", walletAddress, guildId],
      queryFn: () =>
        guildPassClient.membership.getMembership({
          walletAddress: walletAddress!,
          guildId,
        }),
      enabled: !!walletAddress && !!guildId,
      networkMode: "offlineFirst",
    });
  };

  const useUserRoles = (guildId: string) => {
    return useQuery({
      queryKey: ["user-roles", walletAddress, guildId],
      queryFn: () =>
        guildPassClient.roles.getUserRoles({
          walletAddress: walletAddress!,
          guildId,
        }),
      enabled: !!walletAddress && !!guildId,
      networkMode: "offlineFirst",
    });
  };

  return {
    getMembership: useMembershipQuery,
    getUserRoles: useUserRoles,
    useMembershipQuery,
    useUserRoles,
  };
};
