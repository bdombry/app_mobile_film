import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Movie } from '@/types/movie';
import { StyleSheet, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/detail/${movie.id}`)} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {movie.title}
          </ThemedText>
          <ThemedText style={styles.cardType}>{movie.type === 'movie' ? '🎬' : '📺'}</ThemedText>
        </View>

        <View style={styles.cardInfo}>
          <ThemedText style={styles.infoText}>{movie.genre} • {movie.releaseYear}</ThemedText>
          <ThemedText style={styles.rating}>⭐ {movie.rating}</ThemedText>
        </View>

        <View style={styles.cardDetails}>
          {movie.type === 'movie' ? (
            <ThemedText style={styles.detailText}>{movie.durationMinutes} min</ThemedText>
          ) : (
            <ThemedText style={styles.detailText}>{movie.seasonsCount} saison{movie.seasonsCount! > 1 ? 's' : ''}</ThemedText>
          )}
        </View>

        <ThemedText style={styles.description} numberOfLines={2}>{movie.description}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.two,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  cardType: {
    fontSize: 18,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    opacity: 0.7,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardDetails: {
    marginTop: Spacing.one,
  },
  detailText: {
    fontSize: 12,
    opacity: 0.6,
  },
  description: {
    fontSize: 12,
    opacity: 0.6,
    lineHeight: 16,
    marginTop: Spacing.one,
  },
});
