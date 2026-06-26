import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const watchlistId = params.id;

    if (!watchlistId) {
      return NextResponse.json(
        { error: 'id is required' },
        { status: 400 }
      );
    }

    // TODO: Delete from database
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from watchlist' },
      { status: 500 }
    );
  }
}
