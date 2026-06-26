const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with test data...');

  const hashed = bcrypt.hashSync('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'tester@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'tester@example.com',
      password: hashed,
      image: null,
      preferredGenres: '[]',
      moodPreferences: '[]',
    },
  });

  const movies = [
    {
      id: 1001,
      title: 'Feel Good Movie',
      overview: 'A lighthearted film to lift your mood.',
      posterPath: '/poster1.jpg',
      backdropPath: '/backdrop1.jpg',
      releaseDate: new Date('2020-05-01'),
      rating: 7.8,
      voteCount: 1200,
      genres: JSON.stringify(['Comedy', 'Family']),
      originalLanguage: 'en',
      popularity: 45.2,
    },
    {
      id: 1002,
      title: 'Thoughtful Drama',
      overview: 'A film that makes you reflect.',
      posterPath: '/poster2.jpg',
      backdropPath: '/backdrop2.jpg',
      releaseDate: new Date('2019-11-12'),
      rating: 8.2,
      voteCount: 980,
      genres: JSON.stringify(['Drama']),
      originalLanguage: 'en',
      popularity: 32.1,
    },
    {
      id: 1003,
      title: 'Thriller Blast',
      overview: 'Edge-of-your-seat thrills.',
      posterPath: '/poster3.jpg',
      backdropPath: '/backdrop3.jpg',
      releaseDate: new Date('2021-07-09'),
      rating: 6.9,
      voteCount: 540,
      genres: JSON.stringify(['Thriller', 'Action']),
      originalLanguage: 'en',
      popularity: 28.7,
    },
  ];

  for (const m of movies) {
    await prisma.movie.upsert({
      where: { id: m.id },
      update: m,
      create: m,
    });
  }

  // Watchlist
  await prisma.watchlist.upsert({
    where: { id: 'wl-1' },
    update: {},
    create: {
      id: 'wl-1',
      userId: user.id,
      movieId: 1001,
      status: 'to_watch',
    },
  });

  // Ratings
  await prisma.rating.upsert({
    where: { id: 'r-1' },
    update: {},
    create: {
      id: 'r-1',
      userId: user.id,
      movieId: 1002,
      rating: 8.0,
      review: 'Really made me think.',
    },
  });

  // Mood tags
  await prisma.moodTag.upsert({
    where: { id: 'mood-1' },
    update: {},
    create: {
      id: 'mood-1',
      mood: 'feel_good',
      movieId: 1001,
    },
  });

  // Recommendations (simple symmetric entries)
  await prisma.movieRecommendation.upsert({
    where: { id: 'rec-1' },
    update: {},
    create: {
      id: 'rec-1',
      movieId: 1001,
      relatedMovieId: 1002,
      similarity: 0.654,
      reason: 'Shared themes and audience overlap',
    },
  });

  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      theme: 'dark',
      emailNotifications: true,
      discoverNotifications: true,
      language: 'en',
    },
  });

  console.log('Seeding complete. Test user: tester@example.com, password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
