# CineMatch Pro - AI-Powered Movie Recommendation System

## Overview

**CineMatch Pro** is an advanced, full-stack movie recommendation system that goes beyond the original CineMatch. It features AI-driven personalized recommendations, mood-based movie discovery, and a beautiful, modern user interface.

## 🚀 Key Features

### Core Features
- **Mood-Based Recommendations** - 8 different moods with curated movie suggestions
- **AI-Powered Recommendation Engine** - Hybrid collaborative + content-based filtering
- **Advanced Search & Discovery** - Filter by genre, rating, year, and more
- **Personal Watchlist** - Save and organize movies to watch later
- **User Ratings & Reviews** - Rate movies and leave detailed reviews
- **Trending Movies** - Real-time trending section updated weekly
- **Notifications & Alerts** - Get notified about new releases and recommendations

### Authentication & User Management
- Secure user authentication with bcrypt hashing
- User profiles with preferences
- Personalized recommendation settings
- Email notification preferences

### Advanced Features
- **Smart Recommendations** - Uses machine learning for better suggestions
- **Social Features** - See what others are watching and rating
- **Top 10 Rankings** - Weekly trending and all-time best movies
- **Dark Theme UI** - Beautiful, modern design optimized for viewing
- **Responsive Design** - Perfect on mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Custom components with Framer Motion animations
- **Charts**: Recharts for analytics
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js + JWT
- **API Integration**: TMDB API (TheMovieDatabase)
- **Security**: bcryptjs for password hashing

### Infrastructure
- **Deployment**: Vercel-ready
- **Database**: PostgreSQL (can be deployed on Heroku, Railway, etc.)
- **Environment Variables**: Secure configuration management

## 📋 Project Structure

```
.
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Main dashboard pages
│   ├── api/                 # API routes
│   │   ├── movies/          # Movie endpoints
│   │   ├── recommendations/ # Recommendation endpoints
│   │   └── watchlist/       # Watchlist endpoints
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Navbar.tsx
│   ├── MoodSelector.tsx
│   ├── MovieCard.tsx
│   └── MovieGrid.tsx
├── lib/                     # Utility functions
│   ├── tmdb.ts             # TMDB API client
│   ├── recommendations.ts  # Recommendation algorithm
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # General utilities
├── types/                   # TypeScript types
├── prisma/                  # Database schema
├── public/                  # Static assets
└── styles/                  # CSS files
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- TMDB API key (free at https://www.themoviedb.org/settings/api)

### Installation

1. **Clone or create the project**
```bash
cd "AI-Based Movie Recommendation System"
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
```
DATABASE_URL=postgresql://user:password@localhost:5432/cinesense
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
TMDB_API_KEY=your_tmdb_api_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
```

4. **Setup the database**
```bash
npm run db:push
```

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🎯 Key Improvements Over Original

| Feature | Original | CineMatch Pro |
|---------|----------|---------------|
| Recommendation Algorithm | Basic genre matching | Hybrid AI (Collaborative + Content-based) |
| UI/UX | Good | Premium with smooth animations |
| Database | Basic | Full Prisma ORM with relationships |
| Authentication | Basic | Secure with bcrypt + JWT |
| API Integration | TMDB | TMDB + advanced filtering |
| Notifications | Basic | Advanced with type system |
| Analytics | None | Rating trends, popularity tracking |
| Customization | Limited | Full user preferences |

## 🔧 API Endpoints

### Movies
- `GET /api/movies` - Search/get movies
- `GET /api/movies/[id]` - Get movie details
- `GET /api/movies?type=trending` - Get trending movies
- `GET /api/movies?type=popular` - Get popular movies

### Recommendations
- `GET /api/recommendations/by-mood?mood=feel_good` - Get mood-based recommendations
- `GET /api/recommendations/by-mood?mood=[mood]&page=[n]` - Paginated recommendations

### Watchlist
- `GET /api/watchlist?userId=[id]` - Get user's watchlist
- `POST /api/watchlist` - Add movie to watchlist
- `DELETE /api/watchlist/[id]` - Remove from watchlist

## 🧠 Recommendation Algorithm

The system uses a **Hybrid Recommendation Engine** that combines:

1. **Content-Based Filtering** (60% weight)
   - Genre similarity (Jaccard similarity)
   - Rating compatibility
   - User preference alignment

2. **Collaborative Filtering** (40% weight)
   - User rating patterns
   - Similar movies rated by users
   - Genre intersection scoring

This approach ensures both personalized recommendations and discovery of diverse content.

## 📊 Future Enhancements

- [ ] Real-time collaborative features
- [ ] Deep learning recommendation models
- [ ] Social network features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Movie groups/clubs
- [ ] Watch parties
- [ ] AI-powered movie summaries
- [ ] Personalized newsletters

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 🔒 Security Features

- Password hashing with bcryptjs
- Environment variable protection
- CORS configuration
- Input validation on all routes
- SQL injection prevention (via Prisma)
- XSS protection via Next.js

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and structure.

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
