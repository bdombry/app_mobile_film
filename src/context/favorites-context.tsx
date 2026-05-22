import { createContext, useContext, useMemo, useState } from "react";

import { INITIAL_MOVIES } from "@/data/movies";

type FavoritesContextValue = {
  favoriteIds: string[];
  favoritesCount: number;
  isFavorite: (movieId: string) => boolean;
  toggleFavorite: (movieId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    INITIAL_MOVIES.filter((movie) => movie.isRecommended).map(
      (movie) => movie.id,
    ),
  );

  const value = useMemo<FavoritesContextValue>(() => {
    const isFavorite = (movieId: string) => favoriteIds.includes(movieId);

    const toggleFavorite = (movieId: string) => {
      setFavoriteIds((current) =>
        current.includes(movieId)
          ? current.filter((id) => id !== movieId)
          : [...current, movieId],
      );
    };

    return {
      favoriteIds,
      favoritesCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
    };
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
