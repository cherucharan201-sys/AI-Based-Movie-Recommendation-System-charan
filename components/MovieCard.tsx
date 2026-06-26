'use client';

import Image from 'next/image';
import { getImageUrl, truncateText } from '@/lib/utils';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  onWatch?: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
}

export function MovieCard({ movie, onWatch, onAddToList }: MovieCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-slate-800">
      {/* Poster Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={getImageUrl(movie.posterPath)}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold text-white mb-2">{truncateText(movie.title, 30)}</h3>
        <p className="text-sm text-gray-300 mb-3">{truncateText(movie.overview, 60)}</p>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {onWatch && (
            <button
              onClick={() => onWatch(movie)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Watch
            </button>
          )}
          {onAddToList && (
            <button
              onClick={() => onAddToList(movie)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Static Info */}
      <div className="p-4 absolute bottom-0 left-0 right-0 group-hover:hidden transition-all">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-300 truncate">{movie.title}</span>
          <span className="text-yellow-400 font-bold text-sm bg-slate-900 px-2 py-1 rounded">
            {movie.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
