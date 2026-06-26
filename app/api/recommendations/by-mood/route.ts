import { NextRequest, NextResponse } from 'next/server';
import { getMoviesByMood } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood') || 'feel_good';
    const page = searchParams.get('page') || '1';

    const movies = await getMoviesByMood(mood, parseInt(page));

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching mood-based recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}
