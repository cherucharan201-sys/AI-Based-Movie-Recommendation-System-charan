import { NextRequest, NextResponse } from 'next/server';
import { searchMovies, getPopularMovies, getTrendingMovies } from '@/lib/tmdb';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'search'; // search, popular, trending
    const page = searchParams.get('page') || '1';

    let data;

    if (type === 'trending') {
      data = await getTrendingMovies();
    } else if (type === 'popular') {
      data = await getPopularMovies(parseInt(page));
    } else if (query) {
      data = await searchMovies(query, parseInt(page));
    } else {
      return NextResponse.json(
        { error: 'Query parameter or type is required' },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movies from TMDB, falling back to local DB:', error);

    // Fallback: return local seeded movies from the database
    try {
      const localMovies = await prisma.movie.findMany({ take: 10, orderBy: { popularity: 'desc' } });
      const results = localMovies.map((m) => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        poster_path: m.posterPath,
        backdrop_path: m.backdropPath,
        release_date: m.releaseDate ? m.releaseDate.toISOString().split('T')[0] : null,
        vote_average: m.rating,
        vote_count: m.voteCount,
        popularity: m.popularity,
      }));

      return NextResponse.json({ results });
    } catch (dbErr) {
      console.error('Fallback DB query failed:', dbErr);
      return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
  }
}
