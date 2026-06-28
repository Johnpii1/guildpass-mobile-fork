import { View, Text } from "react-native";
import React from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import type { AccessHistoryEntry } from "../features/access/accessHistory.store";

type AccessHistoryListProps = {
  entries: AccessHistoryEntry[];
  onClear: () => void;
};

const statusLabel = (status: AccessHistoryEntry["status"]) => {
  switch (status) {
    case "granted":
      return "Granted";
    case "denied":
      return "Denied";
    case "error":
      return "Error";
  }
};

const statusClassName = (status: AccessHistoryEntry["status"]) =>
  status === "granted" ? "text-success" : "text-error";

export const AccessHistoryList = ({ entries, onClear }: AccessHistoryListProps) => {
  if (entries.length === 0) {
    return null;
  }

  return (
    <Card className="mb-12">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-text">Recent Access Checks</Text>
        <Button title="Clear History" onPress={onClear} variant="outline" className="py-2 px-3" />
      </View>

      {entries.map((entry) => (
        <View key={entry.id} className="py-3 border-t border-border">
          <View className="flex-row justify-between">
            <Text className="text-text font-semibold">{entry.resourceId}</Text>
            <Text className={`font-bold ${statusClassName(entry.status)}`}>
              {statusLabel(entry.status)}
            </Text>
          </View>
          <Text className="text-text-muted text-sm mt-1">{entry.guildId}</Text>
          {entry.reason ? (
            <Text className="text-text-muted text-sm mt-1">{entry.reason}</Text>
          ) : null}
          <Text className="text-text-muted text-xs mt-1">
            {new Date(entry.checkedAt).toLocaleString()}
          </Text>
        </View>
      ))}
    </Card>
  );
};
