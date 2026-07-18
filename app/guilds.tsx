import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { AppHeader } from "../src/components/AppHeader";
import { GuildCard } from "../src/components/GuildCard";
import { EmptyState } from "../src/components/EmptyState";
import { WalletRequired } from "../src/components/WalletRequired";
import React from "react";

export default function Guilds() {
  const router = useRouter();
  const exampleGuilds = [
    {
      id: "guild_abc",
      name: "Alpha Guild",
      isActive: true,
      roleCount: 3,
      assignedRoles: ["Admin", "Contributor"],
    },
    {
      id: "guild_xyz",
      name: "Beta Community",
      isActive: true,
      roleCount: 5,
      assignedRoles: ["Moderator", "Member"],
    },
    {
      id: "guild_123",
      name: "Gamma DAO",
      isActive: false,
      roleCount: 2,
      assignedRoles: ["Member"],
    },
  ];

  return (
    <WalletRequired>
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
              assignedRoles={item.assignedRoles}
              onPress={() => router.push(`/guilds/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="No Guilds Found"
              message="You are not a member of any guilds yet."
              actionTitle="Explore Guilds"
              onAction={() => {}}
            />
          }
        />
      </View>
    </WalletRequired>
  );
}
