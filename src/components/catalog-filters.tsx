import { Pressable, StyleSheet, Switch, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

type MovieTypeFilter = "all" | "movie" | "series";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: MovieTypeFilter;
  setTypeFilter: (value: MovieTypeFilter) => void;
  favoriteOnly: boolean;
  setFavoriteOnly: (value: boolean) => void;
  genreFilter: string;
  setGenreFilter: (value: string) => void;
  genres: string[];
};

export default function CatalogFilters({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  favoriteOnly,
  setFavoriteOnly,
  genreFilter,
  setGenreFilter,
  genres,
}: Props) {
  return (
    <ThemedView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Recherche (titre, genre, créateur, tag)"
        placeholderTextColor="rgba(127,127,127,0.8)"
        style={styles.input}
      />

      <Pressable
        onPress={() => setFavoriteOnly(!favoriteOnly)}
        style={({ pressed }) => [
          styles.toggleRow,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <View style={styles.toggleTextBlock}>
          <ThemedText style={styles.toggleLabel}>Favoris</ThemedText>
          <ThemedText style={styles.toggleHint}>
            Afficher seulement les titres favoris
          </ThemedText>
        </View>
        <Switch
          value={favoriteOnly}
          onValueChange={setFavoriteOnly}
          trackColor={{ false: "rgba(0,0,0,0.2)", true: "#6AA9FF" }}
          thumbColor={favoriteOnly ? "#FFFFFF" : "#F4F4F4"}
        />
      </Pressable>

      <View style={styles.row}>
        <Pressable
          onPress={() => setTypeFilter("all")}
          style={[styles.chip, typeFilter === "all" && styles.chipActive]}
        >
          <ThemedText
            style={
              typeFilter === "all" ? styles.chipTextActive : styles.chipText
            }
          >
            Tous
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => setTypeFilter("movie")}
          style={[styles.chip, typeFilter === "movie" && styles.chipActive]}
        >
          <ThemedText
            style={
              typeFilter === "movie" ? styles.chipTextActive : styles.chipText
            }
          >
            Films
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => setTypeFilter("series")}
          style={[styles.chip, typeFilter === "series" && styles.chipActive]}
        >
          <ThemedText
            style={
              typeFilter === "series" ? styles.chipTextActive : styles.chipText
            }
          >
            Séries
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.rowWrap}>
        <Pressable
          onPress={() => setGenreFilter("")}
          style={[styles.chip, genreFilter === "" && styles.chipActive]}
        >
          <ThemedText
            style={genreFilter === "" ? styles.chipTextActive : styles.chipText}
          >
            Tous
          </ThemedText>
        </Pressable>

        {genres.map((genre) => (
          <Pressable
            key={genre}
            onPress={() => setGenreFilter(genre)}
            style={[styles.chip, genreFilter === genre && styles.chipActive]}
          >
            <ThemedText
              style={
                genreFilter === genre ? styles.chipTextActive : styles.chipText
              }
            >
              {genre}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
  rowWrap: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  toggleTextBlock: {
    flex: 1,
    paddingRight: Spacing.three,
    gap: 2,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  toggleHint: {
    fontSize: 12,
    opacity: 0.7,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  chipActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    fontSize: 13,
    color: "#fff",
  },
});
