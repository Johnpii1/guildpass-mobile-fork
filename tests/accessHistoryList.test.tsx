import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import { AccessHistoryList } from "../src/components/AccessHistoryList";
import type { AccessHistoryEntry } from "../src/features/access/accessHistory.store";

vi.mock("react-native", () => ({
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
}));

const entry: AccessHistoryEntry = {
  id: "entry-1",
  walletAddress: "0x1234567890123456789012345678901234567890",
  guildId: "guild-alpha",
  resourceId: "vip-door",
  status: "denied",
  reason: "Wallet does not hold any required roles.",
  checkedAt: "2026-06-28T10:00:00.000Z",
  matchedRoles: [],
  requiredRoles: ["Member"],
};

describe("AccessHistoryList", () => {
  it("renders recent access metadata without sensitive payload fields", () => {
    const renderer = TestRenderer.create(<AccessHistoryList entries={[entry]} onClear={vi.fn()} />);
    const output = JSON.stringify(renderer.toJSON());

    expect(output).toContain("Recent Access Checks");
    expect(output).toContain("vip-door");
    expect(output).toContain("guild-alpha");
    expect(output).toContain("Denied");
    expect(output).toContain("Wallet does not hold any required roles.");
    expect(output).not.toMatch(/authorization/i);
    expect(output).not.toMatch(/secret/i);
  });

  it("calls onClear when the user clears history", () => {
    const onClear = vi.fn();
    const renderer = TestRenderer.create(<AccessHistoryList entries={[entry]} onClear={onClear} />);

    act(() => {
      renderer.root.findByProps({ accessibilityLabel: "Clear History" }).props.onPress();
    });

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
