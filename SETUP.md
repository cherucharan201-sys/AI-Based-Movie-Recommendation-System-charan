# CineMatch Pro - Complete Setup Guide

## 🚀 Quick Start

### Step 1: Install Node.js (Windows)

1. Download Node.js from [nodejs.org](https://nodejs.org/) (LTS version recommended)
2. Run the installer and follow the prompts
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Step 2: Navigate to Project & Install Dependencies

```powershell
Set-Location "C:\Users\cheru\Documents\AI-Based Movie Recommendation System"
npm install
```

### Step 3: Configure Environment Variables

1. Open `.env.local` file (or copy from `.env.local.example`)
2. Add your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cinesense"

# TMDB API Key (get free at https://www.themoviedb.org/settings/api)
NEXT_PUBLIC_TMDB_API_KEY="your_api_key_here"
TMDB_API_KEY="your_api_key_here"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key_here"
```

### Step 4: Setup PostgreSQL Database

**Option A: Using Local PostgreSQL**
1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create a new database:
   ```sql
   CREATE DATABASE cinesense;
   ```

**Option B: Using Cloud Database (Recommended)**
- [Railway.app](https://railway.app/) - Free PostgreSQL
- [Supabase.com](https://supabase.com/) - Free PostgreSQL
- [Render.com](https://render.com/) - Free PostgreSQL

### Step 5: Initialize Database Schema

```powershell
npm run db:push
```

This will:
- Create all database tables based on Prisma schema
- Setup relationships and constraints
- Create indexes for performance

### Step 6: Run Development Server

```powershell
npm run dev
```

Visit **http://localhost:3000** in your browser!

## 📁 What's Included

### Project Structure
```
📦 CineMatch Pro
├── 🎨 components/          # React components
│   ├── Navbar.tsx
│   ├── MoodSelector.tsx
│   ├── MovieCard.tsx
│   └── MovieGrid.tsx
├── ⚙️ app/                 # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main pages
│   ├── api/               # Backend APIs
│   └── layout.tsx         # Root layout
├── 🔧 lib/                # Utility functions
│   ├── tmdb.ts           # TMDB API client
│   ├── recommendations.ts # AI algorithm
│   ├── auth.ts           # Auth utilities
│   └── store.ts          # Zustand store
├── 📊 prisma/            # Database schema
├── 🎯 types/             # TypeScript types
└── 📖 README.md          # Documentation
```

## 🎯 Key Features to Explore

### 1. **Home Page** (/)
- 8 mood-based selectors
- Personalized recommendations
- Trending movies section

### 2. **Discover** (/discover)
- Advanced search & filtering
- Browse by genre
- Sort by rating/popularity

### 3. **Watchlist** (/watchlist)
- Save movies to watch
- Track watched movies
- Organize by status

### 4. **Profile** (/profile)
- User preferences
- Notification settings
- Movie preferences

### 5. **Authentication**
- Sign up & login
- Secure password hashing
- JWT session management

## 🤖 AI Recommendation Algorithm

The system uses **Hybrid Recommendation Engine**:

```
Score = (Content-Based × 0.6) + (Collaborative × 0.4)

Content-Based:
- Genre similarity (Jaccard Index)
- Rating compatibility
- User preference alignment

Collaborative:
- User rating patterns
- Similar user behavior
- Co-rated movie analysis
```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/movies` | GET | Search/browse movies |
| `/api/movies/[id]` | GET | Movie details |
| `/api/recommendations/by-mood` | GET | Mood-based recs |
| `/api/watchlist` | GET/POST | Manage watchlist |
| `/api/watchlist/[id]` | DELETE | Remove from list |

## 🔑 Get Your TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Copy your API key
5. Add to `.env.local` as `NEXT_PUBLIC_TMDB_API_KEY`

## 📦 Available Scripts

```powershell
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Sync database schema
npm run db:migrate   # Create new migration
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed sample data
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```powershell
npm run dev -- -p 3001
```

### Database Connection Error
- Check `DATABASE_URL` in `.env.local`
- Verify PostgreSQL is running
- Check credentials are correct

### API Key Issues
- Verify `NEXT_PUBLIC_TMDB_API_KEY` is set
- Check if API key is activated in TMDB settings

### Dependencies Not Found
```powershell
Remove-Item -Recurse node_modules
npm install
```

## 📚 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Next.js 14 + TypeScript |
| Styling | Tailwind CSS 3 |
| Backend | Node.js + Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js + JWT |
| External API | TMDB (The Movie Database) |
| State | Zustand |
| UI Effects | Framer Motion |
| Charts | Recharts |
| Notifications | React Hot Toast |

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Other Options
- Railway.app
- Render.com
- Digital Ocean
- AWS Amplify

## ✨ Advanced Features

### Machine Learning Recommendations
- Content-based filtering
- Collaborative filtering
- Hybrid approach
- Real-time personalization

### User Analytics
- Watch history
- Rating trends
- Genre preferences
- Viewing patterns

### Social Features
- What others are watching
- Popular ratings
- Trending analysis
- Community picks

## 📝 Next Steps

1. ✅ Install Node.js
2. ✅ Clone/setup project
3. ✅ Configure `.env.local`
4. ✅ Setup PostgreSQL database
5. ✅ Run `npm install`
6. ✅ Run `npm run dev`
7. ✅ Open http://localhost:3000
8. ✅ Create account & start exploring!

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM Guide](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TMDB API Reference](https://developers.themoviedb.org/3)

## 🤝 Support

For issues:
1. Check environment variables
2. Verify database connection
3. Check browser console for errors
4. Review Next.js documentation

---

**CineMatch Pro** - Discover movies, not databases.  
Built with ❤️ using Next.js, TypeScript, and TailwindCSS
