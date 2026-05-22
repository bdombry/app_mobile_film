import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CatalogFilters from "@/components/catalog-filters";
import { MovieCard } from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";
import { useFavorites } from "@/context/favorites-context";

type MovieTypeFilter = "all" | "movie" | "series";

export default function CatalogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<MovieTypeFilter>("all");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [genreFilter, setGenreFilter] = useState("");
  const { favoriteIds } = useFavorites();

  const genres = useMemo(() => {
    return Array.from(
      new Set(INITIAL_MOVIES.map((movie) => movie.genre)),
    ).sort();
  }, []);

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return INITIAL_MOVIES.filter((movie) => {
      const matchesType = typeFilter === "all" || movie.type === typeFilter;
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(movie.id);
      const matchesGenre = !genreFilter || movie.genre === genreFilter;
      const matchesSearch =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.creator.toLowerCase().includes(query) ||
        movie.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesType && matchesFavorite && matchesGenre && matchesSearch;
    });
  }, [favoriteIds, favoriteOnly, genreFilter, searchQuery, typeFilter]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Link href="/" style={styles.headerLink}>
          <ThemedText type="title" style={styles.header}>
            CineHub
          </ThemedText>
        </Link>

        <ThemedText type="subtitle" style={styles.title}>
          Catalogue
        </ThemedText>

        <CatalogFilters
          search={searchQuery}
          setSearch={setSearchQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          favoriteOnly={favoriteOnly}
          setFavoriteOnly={setFavoriteOnly}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          genres={genres}
        />

        <ThemedText style={styles.resultsText}>
          {filteredMovies.length} résultat{filteredMovies.length > 1 ? "s" : ""}
        </ThemedText>

        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovieCard movie={item} />}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                Aucun résultat
              </ThemedText>
              <ThemedText style={styles.emptyText}>
                Essaie une autre recherche ou enlève un filtre.
              </ThemedText>
            </View>
          }
        />
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
  title: { marginTop: Spacing.two, marginBottom: Spacing.three },
  header: { marginTop: Spacing.two, marginBottom: Spacing.one },
  headerLink: { paddingVertical: Spacing.two, alignSelf: "flex-start" },
  resultsText: {
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
    fontSize: 14,
    opacity: 0.8,
  },
  listContent: { gap: Spacing.three, paddingBottom: Spacing.four },
  emptyState: {
    paddingVertical: Spacing.five,
    alignItems: "center",
    gap: Spacing.two,
  },
  emptyTitle: {
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 13,
    opacity: 0.7,
  },
});
