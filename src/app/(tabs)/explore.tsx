import { Link } from "expo-router";
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
        <Link href="/" style={styles.headerLink}>
          <ThemedText type="title" style={styles.header}>CineHub</ThemedText>
        </Link>

        <ThemedText type="subtitle" style={styles.title}>Catalogue</ThemedText>

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
  container: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: Spacing.four, paddingBottom: BottomTabInset + Spacing.three, maxWidth: MaxContentWidth },
  title: { marginTop: Spacing.two, marginBottom: Spacing.three },
  header: { marginTop: Spacing.two, marginBottom: Spacing.one },
  headerLink: { paddingVertical: Spacing.two, alignSelf: "flex-start" },
  listContent: { gap: Spacing.three, paddingBottom: Spacing.four },
});