import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MovieCard } from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";
import { useFavorites } from "@/context/favorites-context";
import CatalogFilters from "@/components/catalog-filters";

type MovieTypeFilter = "all" | "movie" | "series";

export default function CatalogScreen() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<MovieTypeFilter>("all");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [genreFilter, setGenreFilter] = useState("");
  const { favoriteIds } = useFavorites();

  const genres = useMemo(
    () => Array.from(new Set(INITIAL_MOVIES.map((m) => m.genre))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return INITIAL_MOVIES.filter((m) => {
      const matchesType = typeFilter === "all" || m.type === typeFilter;
      const matchesFavorite = !favoriteOnly || favoriteIds.includes(m.id);
      const matchesGenre = !genreFilter || m.genre === genreFilter;
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.creator.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q));
      return matchesType && matchesFavorite && matchesGenre && matchesQuery;
    });
  }, [favoriteIds, favoriteOnly, search, typeFilter, genreFilter]);
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="subtitle" style={styles.title}>
          Catalogue
        </ThemedText>

        <CatalogFilters
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          favoriteOnly={favoriteOnly}
          setFavoriteOnly={setFavoriteOnly}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          genres={genres}
        />

        <ThemedText style={styles.results}>
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </ThemedText>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovieCard movie={item} />}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <ThemedText type="subtitle">Aucun résultat</ThemedText>
            </View>
          }
        />
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
  title: {
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  results: {
    marginBottom: Spacing.two,
    fontSize: 14,
    opacity: 0.85,
  },
  empty: { paddingVertical: Spacing.four, alignItems: "center" },
  listContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
});
