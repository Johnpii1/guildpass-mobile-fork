// GuildPass Mobile: Import package module dependencies.
import { View, Text } from "react-native";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import React from "react";
// GuildPass Mobile: Import package module dependencies.
import { Button } from "./Button";

// GuildPass Mobile: Enter functional execution container scope block.
type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
  // GuildPass Mobile: Exit functional execution container scope block.
};

// GuildPass Mobile: Core mobile screen or hook export definition.
export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  // GuildPass Mobile: Return evaluated JSX layout or callback response.
  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Text className="text-error text-xl font-bold text-center mb-2">Something went wrong</Text>
      <Text className="text-text-muted text-center mb-6">{message}</Text>
      {onRetry && <Button title="Try Again" onPress={onRetry} variant="outline" />}
    </View>
  );
  // GuildPass Mobile: Exit functional execution container scope block.
};
