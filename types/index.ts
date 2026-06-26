export interface Movie {
  id: number;
  title: string;
  overview?: string;
  posterPath?: string;
  backdropPath?: string;
  releaseDate?: string;
  rating: number;
  voteCount: number;
  genres: string[];
  originalLanguage: string;
  budget?: number;
  revenue?: number;
  runtime?: number;
  popularity: number;
}

export interface Recommendation {
  id: string;
  movieId: number;
  relatedMovieId: number;
  similarity: number;
  reason?: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  movieId: number;
  status: 'to_watch' | 'watching' | 'watched';
  addedAt: Date;
}

export interface Rating {
  id: string;
  userId: string;
  movieId: number;
  rating: number;
  review?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  preferredGenres: string[];
  moodPreferences: string[];
  createdAt: Date;
}

export interface Mood {
  name: string;
  emoji: string;
  genres: string[];
  keywords: string[];
}

export const MOODS: Record<string, Mood> = {
  feel_good: {
    name: 'Feel-Good',
    emoji: '😊',
    genres: ['Comedy', 'Family', 'Animation'],
    keywords: ['uplifting', 'heartwarming', 'funny'],
  },
  thought_provoking: {
    name: 'Thought-Provoking',
    emoji: '🤔',
    genres: ['Drama', 'Mystery', 'Thriller'],
    keywords: ['intelligent', 'philosophical', 'complex'],
  },
  thrilling: {
    name: 'Thrilling',
    emoji: '😱',
    genres: ['Action', 'Thriller', 'Crime'],
    keywords: ['intense', 'suspenseful', 'exciting'],
  },
  emotional: {
    name: 'Emotional',
    emoji: '😢',
    genres: ['Drama', 'Romance'],
    keywords: ['touching', 'moving', 'tearjerker'],
  },
  hilarious: {
    name: 'Hilarious',
    emoji: '😂',
    genres: ['Comedy'],
    keywords: ['funny', 'humorous', 'hilarious'],
  },
  inspiring: {
    name: 'Inspiring',
    emoji: '🌟',
    genres: ['Drama', 'Biography', 'Sport'],
    keywords: ['motivating', 'uplifting', 'hero'],
  },
  mind_bending: {
    name: 'Mind-Bending',
    emoji: '🔮',
    genres: ['Sci-Fi', 'Fantasy', 'Mystery'],
    keywords: ['mind-bending', 'mysterious', 'surreal'],
  },
  spooky: {
    name: 'Spooky',
    emoji: '🎃',
    genres: ['Horror', 'Thriller'],
    keywords: ['scary', 'eerie', 'suspenseful'],
  },
};

export interface NotificationPayload {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}
