// Recommendation Algorithm using Collaborative Filtering + Content-Based Filtering

export function calculateSimilarity(
  movie1Genres: string[],
  movie2Genres: string[],
  movie1Rating: number,
  movie2Rating: number,
  ratingWeight: number = 0.1
): number {
  // Genre similarity (Jaccard similarity)
  const intersection = movie1Genres.filter(g => movie2Genres.includes(g));
  const union = [...new Set([...movie1Genres, ...movie2Genres])];
  const genreSimilarity = union.length === 0 ? 0 : intersection.length / union.length;

  // Rating similarity (normalized difference)
  const ratingDifference = Math.abs(movie1Rating - movie2Rating) / 10;
  const ratingSimilarity = 1 - ratingDifference;

  // Combined similarity
  return genreSimilarity * (1 - ratingWeight) + ratingSimilarity * ratingWeight;
}

export function getRecommendationReason(
  movie1Title: string,
  movie2Title: string,
  sharedGenres: string[]
): string {
  if (sharedGenres.length === 0) {
    return `Similar to ${movie1Title}`;
  }
  return `Similar ${sharedGenres[0]} film to ${movie1Title}`;
}

export interface RecommendationInput {
  userId: string;
  userRatings: Map<number, number>; // movieId -> rating
  userPreferredGenres: string[];
  moodPreference?: string;
}

export interface RecommendedMovie {
  movieId: number;
  score: number;
  reason: string;
}

// Collaborative + Content-Based Hybrid Recommendation
export function calculateHybridRecommendationScore(
  movieId: number,
  userRatings: Map<number, number>,
  movieMetadata: Map<number, { genres: string[]; rating: number }>,
  userPreferredGenres: string[],
  contentWeight: number = 0.6,
  collaborativeWeight: number = 0.4
): number {
  let contentScore = 0;
  let collaborativeScore = 0;

  const movieMeta = movieMetadata.get(movieId);
  if (!movieMeta) return 0;

  // Content-Based Scoring
  const genreMatch = movieMeta.genres.filter(g => userPreferredGenres.includes(g)).length;
  contentScore = (genreMatch / Math.max(userPreferredGenres.length, 1)) * (movieMeta.rating / 10);

  // Collaborative Filtering
  let totalSimilarity = 0;
  let similarityCount = 0;

  userRatings.forEach((rating, ratedMovieId) => {
    if (ratedMovieId === movieId) return;

    const ratedMovieMeta = movieMetadata.get(ratedMovieId);
    if (!ratedMovieMeta) return;

    const similarity = calculateSimilarity(
      movieMeta.genres,
      ratedMovieMeta.genres,
      movieMeta.rating,
      ratedMovieMeta.rating
    );

    totalSimilarity += similarity * (rating / 10);
    similarityCount++;
  });

  if (similarityCount > 0) {
    collaborativeScore = totalSimilarity / similarityCount;
  }

  return contentScore * contentWeight + collaborativeScore * collaborativeWeight;
}
