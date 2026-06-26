'use client';

import { useState, useEffect } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { MovieGrid } from '@/components/MovieGrid';
import { Movie } from '@/types';
import toast from 'react-hot-toast';

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string>('feel_good');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMoviesByMood(selectedMood);
    fetchTrendingMovies();
  }, [selectedMood]);

  async function fetchMoviesByMood(mood: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/recommendations/by-mood?mood=${mood}`);
      const data = await response.json();
      
      const formattedMovies = data.results?.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: [],
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
      })) || [];
      
      setMovies(formattedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTrendingMovies() {
    try {
      const response = await fetch('/api/movies?type=trending');
      const data = await response.json();
      
      const formattedMovies = data.results?.slice(0, 10).map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count,
        genres: [],
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
      })) || [];
      
      setTrending(formattedMovies);
    } catch (error) {
      console.error('Error fetching trending:', error);
    }
  }

  const handleMovieAction = (movie: Movie, action: 'watch' | 'add') => {
    if (action === 'watch') {
      toast.success(`Playing ${movie.title}`);
    } else if (action === 'add') {
      toast.success(`Added ${movie.title} to your watchlist`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            CineMatch Pro
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Discover your next favorite film powered by AI
          </p>
        </div>

        {/* Mood Selector */}
        <div className="mb-16">
          <MoodSelector 
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
          />
        </div>

        {/* Recommendations by Mood */}
        <div className="mb-16">
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            title="Recommended for You"
            onMovieAction={handleMovieAction}
          />
        </div>

        {/* Trending Section */}
        {trending.length > 0 && (
          <div>
            <MovieGrid
              movies={trending}
              title="🔥 Top 10 Trending"
              onMovieAction={handleMovieAction}
            />
          </div>
        )}
      </div>
    </div>
  );
}
