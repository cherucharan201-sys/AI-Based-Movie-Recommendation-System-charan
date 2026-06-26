import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export async function searchMovies(query: string, page: number = 1) {
  const { data } = await tmdbClient.get('/search/movie', {
    params: { query, page },
  });
  return data;
}

export async function getMovieDetails(movieId: number) {
  const { data } = await tmdbClient.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,recommendations,similar',
    },
  });
  return data;
}

export async function getPopularMovies(page: number = 1) {
  const { data } = await tmdbClient.get('/movie/popular', {
    params: { page },
  });
  return data;
}

export async function getTrendingMovies() {
  const { data } = await tmdbClient.get('/trending/movie/week');
  return data;
}

export async function getMoviesByGenre(genreId: number, page: number = 1) {
  const { data } = await tmdbClient.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page,
    },
  });
  return data;
}

export async function getGenres() {
  const { data } = await tmdbClient.get('/genre/movie/list');
  return data;
}

export async function getMoviesByMood(mood: string, page: number = 1) {
  // Map moods to genres and keywords
  const moodGenreMap: Record<string, number[]> = {
    feel_good: [35, 16, 10751], // Comedy, Animation, Family
    thought_provoking: [18, 9648, 53], // Drama, Mystery, Thriller
    thrilling: [28, 53, 80], // Action, Thriller, Crime
    emotional: [18, 10749], // Drama, Romance
    hilarious: [35], // Comedy
    inspiring: [18, 36, 10402], // Drama, History, War
    mind_bending: [878, 14, 9648], // Sci-Fi, Fantasy, Mystery
    spooky: [27, 53], // Horror, Thriller
  };

  const genres = moodGenreMap[mood] || [];
  const { data } = await tmdbClient.get('/discover/movie', {
    params: {
      with_genres: genres.join('|'),
      sort_by: 'popularity.desc',
      page,
    },
  });
  return data;
}
