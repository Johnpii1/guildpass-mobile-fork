// GuildPass Mobile: Import package module dependencies.
import { View, Text, ActivityIndicator } from "react-native";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import React from "react";

// GuildPass Mobile: Exposed interface structure for local navigation layouts.
export const LoadingState = ({ message = "Loading..." }: { message?: string }) => {
  // GuildPass Mobile: Return evaluated JSX layout or callback response.
  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <ActivityIndicator size="large" color="#6366f1" />
      <Text className="mt-4 text-text-muted text-lg">{message}</Text>
    </View>
  );
  // GuildPass Mobile: Exit functional execution container scope block.
};
