import { useMemo } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";
import { useFavorites } from "@/context/favorites-context";
import type { Movie } from "@/types/movie";

export default function DetailScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const params = useLocalSearchParams<{ id?: string }>();

  const movie = useMemo<Movie | undefined>(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    return INITIAL_MOVIES.find((item) => item.id === id);
  }, [params.id]);

  const favorite = movie ? isFavorite(movie.id) : false;

  if (!movie) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>Retour</ThemedText>
          </Pressable>
          <ThemedText type="subtitle" style={styles.notFoundTitle}>
            Titre introuvable
          </ThemedText>
          <ThemedText style={styles.description}>
            Ce film ou cette série n’existe pas dans le catalogue local.
          </ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const extraInfo =
    movie.type === "movie"
      ? `${movie.durationMinutes} min`
      : `${movie.seasonsCount} saison${movie.seasonsCount && movie.seasonsCount > 1 ? "s" : ""}`;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <ThemedText style={styles.backButtonText}>Retour</ThemedText>
          </Pressable>

          <ThemedText type="title" style={styles.title}>
            {movie.title}
          </ThemedText>

          <View style={styles.metaRow}>
            <ThemedText style={styles.meta}>
              {movie.type === "movie" ? "Film" : "Série"}
            </ThemedText>
            <ThemedText style={styles.meta}>{movie.genre}</ThemedText>
            <ThemedText style={styles.meta}>{movie.releaseYear}</ThemedText>
          </View>

          <ThemedView style={styles.sectionBox}>
            <ThemedText style={styles.sectionTitle}>
              Informations complètes
            </ThemedText>
            <ThemedText style={styles.infoText}>
              Créateur : {movie.creator}
            </ThemedText>
            <ThemedText style={styles.infoText}>
              Note : {movie.rating}/5
            </ThemedText>
            <ThemedText style={styles.infoText}>{extraInfo}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.sectionBox}>
            <ThemedText style={styles.sectionTitle}>Résumé</ThemedText>
            <ThemedText style={styles.description}>
              {movie.description}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.sectionBox}>
            <ThemedText style={styles.sectionTitle}>Tags</ThemedText>
            <FlatList
              data={movie.tags}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsList}
              renderItem={({ item }) => (
                <View style={styles.tag}>
                  <ThemedText style={styles.tagText}>{item}</ThemedText>
                </View>
              )}
            />
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
  content: {
    gap: Spacing.four,
    paddingVertical: Spacing.four,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  notFoundTitle: {
    marginTop: Spacing.two,
  },
  title: {
    marginTop: Spacing.one,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  meta: {
    fontSize: 12,
    opacity: 0.7,
  },
  sectionBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.two,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.85,
  },
  tagsList: {
    gap: Spacing.two,
  },
  tag: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
