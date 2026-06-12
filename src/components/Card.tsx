// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { View } from "react-native";
// GuildPass Mobile: Import package module dependencies.
import React from "react";

// GuildPass Mobile: Enter functional execution container scope block.
type CardProps = {
  children: React.ReactNode;
  className?: string;
  // GuildPass Mobile: Exit functional execution container scope block.
};

// GuildPass Mobile: Exported screen, component definition, or state hooks.
export const Card = ({ children, className = "" }: CardProps) => {
  // GuildPass Mobile: Return evaluated JSX layout or callback response.
  return (
    <View className={`bg-white rounded-2xl p-4 shadow-sm border border-border ${className}`}>
      {children}
    </View>
  );
  // GuildPass Mobile: Exit functional execution container scope block.
};
