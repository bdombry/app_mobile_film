import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";

export default function HomeScreen() {
  // Calculer les statistiques
  const totalCount = INITIAL_MOVIES.length;
  const moviesCount = INITIAL_MOVIES.filter((m) => m.type === "movie").length;
  const seriesCount = INITIAL_MOVIES.filter((m) => m.type === "series").length;
  const genresCount = new Set(INITIAL_MOVIES.map((m) => m.genre)).size;
  const favoritesCount = INITIAL_MOVIES.filter((m) => m.isRecommended).length;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Titre */}
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              CineHub
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Découvrez films et séries
            </ThemedText>
            <ThemedText style={styles.description}>
              Explorez notre catalogue, trouvez vos favoris et recommandez vos meilleures découvertes.
            </ThemedText>
          </ThemedView>

          {/* Statistiques */}
          <ThemedView style={styles.statsContainer}>
            <ThemedView style={styles.stat}>
              <ThemedText type="title" style={styles.statNumber}>
                {totalCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Titres</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stat}>
              <ThemedText type="title" style={styles.statNumber}>
                {moviesCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Films</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stat}>
              <ThemedText type="title" style={styles.statNumber}>
                {seriesCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Séries</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stat}>
              <ThemedText type="title" style={styles.statNumber}>
                {genresCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Genres</ThemedText>
            </ThemedView>

            <ThemedView style={styles.stat}>
              <ThemedText type="title" style={styles.statNumber}>
                {favoritesCount}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Favoris</ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Boutons d'action */}
          <ThemedView style={styles.buttonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonPrimary,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <ThemedText style={styles.buttonText}>
                Explorer le catalogue
              </ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonSecondary,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <ThemedText style={styles.buttonText}>
                Recommander un titre
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    gap: Spacing.five,
    paddingVertical: Spacing.four,
  },
  header: {
    alignItems: "center",
    gap: Spacing.two,
  },
  title: {
    textAlign: "center",
    marginTop: Spacing.three,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
  },
  description: {
    textAlign: "center",
    fontSize: 13,
    opacity: 0.6,
    lineHeight: 18,
    marginTop: Spacing.one,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginVertical: Spacing.four,
    gap: Spacing.two,
  },
  stat: {
    alignItems: "center",
    gap: Spacing.one,
    flex: 1,
    minWidth: 60,
  },
  statNumber: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  buttonsContainer: {
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
  },
  buttonSecondary: {
    backgroundColor: "#5E5CE6",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
