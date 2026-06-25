// GuildPass Mobile: Import package module dependencies.
import { View, FlatList } from "react-native";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useRouter } from "expo-router";
// GuildPass Mobile: Import package module dependencies.
import { useWallet } from "../src/features/wallet/useWallet";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useMembership } from "../src/features/membership/useMembership";
// GuildPass Mobile: Import package module dependencies.
import { AppHeader } from "../src/components/AppHeader";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { GuildCard } from "../src/components/GuildCard";
// GuildPass Mobile: Import package module dependencies.
import { LoadingState } from "../src/components/LoadingState";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { ErrorState } from "../src/components/ErrorState";
// GuildPass Mobile: Import package module dependencies.
import { EmptyState } from "../src/components/EmptyState";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import React from "react";

// GuildPass Mobile: Exported screen, component definition, or state hooks.
export default function Guilds() {
  // GuildPass Mobile: Variable binding and property initialization.
  const router = useRouter();
  // GuildPass Mobile: Local UI-scoped constant or state representation.
  const { walletAddress } = useWallet();
  // GuildPass Mobile: Variable binding and property initialization.
  const { getMembership } = useMembership(walletAddress);

  // In a real app, you would fetch all guilds.
  // For MVP, we'll show a few example guilds that the user can explore.
  const exampleGuilds = [
    { id: "guild_abc", name: "Alpha Guild", isActive: true, roleCount: 3 },
    { id: "guild_xyz", name: "Beta Community", isActive: true, roleCount: 5 },
    { id: "guild_123", name: "Gamma DAO", isActive: false, roleCount: 2 },
  ];

  // GuildPass Mobile: Terminate block execution context and send back value.
  return (
    <View className="flex-1 bg-background" testID="guilds-screen">
      <AppHeader title="My Guilds" showBack />
      <FlatList
        data={exampleGuilds}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        testID="guilds-list"
        renderItem={({ item }) => (
          <GuildCard
            name={item.name}
            id={item.id}
            isActive={item.isActive}
            roleCount={item.roleCount}
            onPress={() => router.push(`/guilds/${item.id}`)}
          />
        )}
        // GuildPass Mobile: Enter functional execution container scope block.
        ListEmptyComponent={
          <EmptyState
            title="No Guilds Found"
            message="You are not a member of any guilds yet."
            actionTitle="Explore Guilds"
            onAction={() => {}}
          />
          // GuildPass Mobile: Exit functional execution container scope block.
        }
      />
    </View>
  );
  // GuildPass Mobile: Exit functional execution container scope block.
}
