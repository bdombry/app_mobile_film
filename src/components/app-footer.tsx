import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";

export function AppFooter() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea} pointerEvents="box-none">
      <View style={styles.container}>
        <Pressable
          onPress={() => router.push("/")}
          style={({ pressed }) => [
            styles.homeButton,
            { opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <ThemedText style={styles.homeButtonText}>Home</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
    alignItems: "center",
  },
  homeButton: {
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    backgroundColor: "#007AFF",
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
