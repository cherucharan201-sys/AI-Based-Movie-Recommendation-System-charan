'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  title?: string;
  onMovieAction?: (movie: Movie, action: 'watch' | 'add') => void;
}

export function MovieGrid({ movies, isLoading, title, onMovieAction }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        {title && <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onWatch={(m) => onMovieAction?.(m, 'watch')}
            onAddToList={(m) => onMovieAction?.(m, 'add')}
          />
        ))}
      </div>
    </div>
  );
}
