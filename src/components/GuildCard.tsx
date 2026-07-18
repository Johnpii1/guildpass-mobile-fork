import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "./Card";
import { RoleBadge } from "./RoleBadge";

type GuildCardProps = {
  name: string;
  id: string;
  isActive: boolean;
  roleCount: number;
  assignedRoles?: string[];
  onPress: () => void;
};

export const GuildCard = ({
  name,
  id,
  isActive,
  roleCount,
  assignedRoles = [],
  onPress,
}: GuildCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${isActive ? "Active" : "Inactive"}, ${roleCount} roles${assignedRoles.length > 0 ? `, assigned roles: ${assignedRoles.join(", ")}` : ""}`}
    >
      <Card className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-text">{name}</Text>
          <View
            className={`px-3 py-1 rounded-full ${isActive ? "bg-success/10" : "bg-text-muted/10"}`}
          >
            <Text className={`text-xs font-bold ${isActive ? "text-success" : "text-text-muted"}`}>
              {isActive ? "ACTIVE" : "INACTIVE"}
            </Text>
          </View>
        </View>
        <Text className="text-text-muted text-sm mb-4">ID: {id}</Text>
        {assignedRoles.length > 0 && (
          <View className="flex-row flex-wrap mb-2" testID="guild-card-assigned-roles">
            {assignedRoles.slice(0, 3).map((role) => (
              <RoleBadge key={role} name={role} />
            ))}
          </View>
        )}
        <View className="flex-row items-center">
          <Text className="text-primary font-semibold">{roleCount} Roles</Text>
          <Text className="text-text-muted mx-2">•</Text>
          <Text className="text-text-muted">Tap to view details</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
