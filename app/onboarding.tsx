// GuildPass Mobile: Import package module dependencies.
import { View, Text, SafeAreaView, Image } from "react-native";
// GuildPass Mobile: Pull in react-native, expo, or external state libraries.
import { useRouter } from "expo-router";
// GuildPass Mobile: Import package module dependencies.
import { Button } from "../src/components/Button";

// GuildPass Mobile: Core mobile screen or hook export definition.
export default function Onboarding() {
  // GuildPass Mobile: Variable binding and property initialization.
  const router = useRouter();

  // GuildPass Mobile: Return evaluated JSX layout or callback response.
  return (
    <SafeAreaView className="flex-1 bg-white" testID="onboarding-screen">
      <View className="flex-1 px-6 justify-between py-12">
        <View className="items-center mt-12">
          <View className="w-24 h-24 bg-primary rounded-3xl items-center justify-center mb-8 shadow-lg">
            <Text className="text-white text-4xl font-bold">GP</Text>
          </View>
          <Text className="text-3xl font-bold text-text text-center mb-4" testID="onboarding-title">
            Welcome to GuildPass
          </Text>
          <Text className="text-lg text-text-muted text-center px-4" testID="onboarding-subtitle">
            The decentralized gateway to your favorite Web3 communities and gated content.
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-background p-4 rounded-2xl mb-8">
            <Text className="text-text font-semibold mb-2 text-center">MVP Preview Mode</Text>
            <Text className="text-text-muted text-sm text-center">
              // GuildPass Mobile: Local UI-scoped constant or state representation. For this MVP,
              you can manually enter any wallet address to explore guild memberships.
            </Text>
          </View>

          <Button title="Get Started" onPress={() => router.push("/profile")} testID="onboarding-get-started-button" />
        </View>
      </View>
    </SafeAreaView>
  );
  // GuildPass Mobile: Exit functional execution container scope block.
}
