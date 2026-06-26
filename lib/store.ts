import { create } from 'zustand';

interface Movie {
  id: number;
  title: string;
  [key: string]: any;
}

interface UserStore {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  ratings: Map<number, number>;
  rateMovie: (movieId: number, rating: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, watchlist: [], ratings: new Map() }),
  watchlist: [],
  addToWatchlist: (movie) =>
    set((state) => ({
      watchlist: [movie, ...state.watchlist],
    })),
  removeFromWatchlist: (movieId) =>
    set((state) => ({
      watchlist: state.watchlist.filter((m) => m.id !== movieId),
    })),
  ratings: new Map(),
  rateMovie: (movieId, rating) =>
    set((state) => {
      const newRatings = new Map(state.ratings);
      newRatings.set(movieId, rating);
      return { ratings: newRatings };
    }),
}));
