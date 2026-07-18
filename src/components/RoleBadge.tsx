import { View, Text } from "react-native";
import React from "react";

export type RoleBadgeTier = "owner" | "admin" | "moderator" | "contributor" | "member";

type RoleBadgeProps = {
  name: string;
  tier?: RoleBadgeTier;
  icon?: string;
};

const tierStyles: Record<
  RoleBadgeTier,
  { container: string; text: string; defaultIcon: string; label: string }
> = {
  owner: {
    container: "bg-error/10 border-error/30",
    text: "text-error",
    defaultIcon: "◆",
    label: "Owner tier",
  },
  admin: {
    container: "bg-secondary/10 border-secondary/30",
    text: "text-secondary",
    defaultIcon: "★",
    label: "Admin tier",
  },
  moderator: {
    container: "bg-success/10 border-success/30",
    text: "text-success",
    defaultIcon: "✓",
    label: "Moderator tier",
  },
  contributor: {
    container: "bg-primary/10 border-primary/30",
    text: "text-primary",
    defaultIcon: "+",
    label: "Contributor tier",
  },
  member: {
    container: "bg-text-muted/10 border-text-muted/30",
    text: "text-text",
    defaultIcon: "•",
    label: "Member tier",
  },
};

export const getRoleBadgeTier = (name: string): RoleBadgeTier => {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("owner")) return "owner";
  if (normalizedName.includes("admin")) return "admin";
  if (normalizedName.includes("mod")) return "moderator";
  if (normalizedName.includes("contributor")) return "contributor";

  return "member";
};

export const RoleBadge = ({ name, tier = getRoleBadgeTier(name), icon }: RoleBadgeProps) => {
  const styles = tierStyles[tier];
  const badgeIcon = icon ?? styles.defaultIcon;

  return (
    <View
      className={`flex-row items-center border px-3 py-1.5 rounded-full mr-2 mb-2 ${styles.container}`}
      accessibilityLabel={`Role: ${name}. ${styles.label}`}
      testID="role-badge"
    >
      <Text
        className={`text-xs font-bold mr-1 ${styles.text}`}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {badgeIcon}
      </Text>
      <Text className={`font-semibold text-sm ${styles.text}`}>{name}</Text>
    </View>
  );
};
