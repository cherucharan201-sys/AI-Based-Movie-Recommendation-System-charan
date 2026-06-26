import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, movieId, status } = body;

    if (!userId || !movieId) {
      return NextResponse.json(
        { error: 'userId and movieId are required' },
        { status: 400 }
      );
    }

    // TODO: Add to database once Prisma is connected
    // const watchlistItem = await prisma.watchlist.create({
    //   data: {
    //     userId,
    //     movieId,
    //     status: status || 'to_watch',
    //   },
    // });

    return NextResponse.json({
      id: 'temp-id',
      userId,
      movieId,
      status: status || 'to_watch',
      addedAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to watchlist' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // TODO: Fetch from database
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}
