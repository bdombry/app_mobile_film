import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MovieCard } from "@/components/movie-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { INITIAL_MOVIES } from "@/data/movies";

export default function CatalogScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="subtitle" style={styles.title}>
          Catalogue
        </ThemedText>

        <FlatList
          data={INITIAL_MOVIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovieCard movie={item} />}
          scrollEnabled={true}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  listContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
});
