import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";
import { useFavorites } from "@/context/favorites-context";
import { MovieCard } from "@/components/movie-card";

export default function HomeScreen() {
  const router = useRouter();
  const { favoriteIds, favoritesCount } = useFavorites();

  const totalCount = INITIAL_MOVIES.length;
  const moviesCount = INITIAL_MOVIES.filter((m) => m.type === "movie").length;
  const seriesCount = INITIAL_MOVIES.filter((m) => m.type === "series").length;
  const genresCount = new Set(INITIAL_MOVIES.map((m) => m.genre)).size;
  const favoriteMovies = INITIAL_MOVIES.filter((movie) =>
    favoriteIds.includes(movie.id),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              CineHub
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Découvrez films et séries
            </ThemedText>
            <ThemedText style={styles.description}>
              Explorez notre catalogue, trouvez vos favoris et recommandez vos
              meilleures découvertes.
            </ThemedText>
          </ThemedView>

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

          <ThemedView style={styles.buttonsContainer}>
            <Pressable
              onPress={() => router.push("/explore")}
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
              onPress={() => router.push("/recommend")}
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

          <ThemedView style={styles.favoritesSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Mes favoris
            </ThemedText>
            <ThemedText style={styles.sectionCount}>
              {favoritesCount} favori{favoritesCount > 1 ? "s" : ""}
            </ThemedText>

            {favoriteMovies.length === 0 ? (
              <ThemedText style={styles.emptyText}>
                Aucun favori pour l’instant. Ouvre un titre puis appuie sur le
                bouton favori.
              </ThemedText>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.favoritesList}
              >
                {favoriteMovies.map((movie) => (
                  <ThemedView key={movie.id} style={styles.favoriteCardWrap}>
                    <MovieCard movie={movie} />
                  </ThemedView>
                ))}
              </ScrollView>
            )}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  scrollContent: { gap: Spacing.five, paddingVertical: Spacing.four },
  header: { alignItems: "center", gap: Spacing.two },
  title: { textAlign: "center", marginTop: Spacing.three },
  subtitle: { textAlign: "center", fontSize: 14, opacity: 0.7 },
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
  stat: { alignItems: "center", gap: Spacing.one, flex: 1, minWidth: 60 },
  statNumber: { fontSize: 20 },
  statLabel: { fontSize: 12, opacity: 0.6 },
  buttonsContainer: { gap: Spacing.three, marginTop: Spacing.four },
  favoritesSection: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  sectionCount: {
    fontSize: 13,
    opacity: 0.7,
  },
  favoritesList: {
    gap: Spacing.three,
    paddingVertical: Spacing.one,
  },
  favoriteCardWrap: {
    width: 260,
  },
  emptyText: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: { backgroundColor: "#007AFF" },
  buttonSecondary: { backgroundColor: "#5E5CE6" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
