# CineMatch Pro - Architecture & Features Guide

## 🎬 System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     USER INTERFACE (FRONTEND)                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │   Home      │  │  Discover    │  │  Watchlist   │            │
│  │  • Moods    │  │  • Search    │  │  • My List   │            │
│  │  • Trending │  │  • Filters   │  │  • Status    │            │
│  └─────────────┘  └──────────────┘  └──────────────┘            │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐                              │
│  │  Profile    │  │  Auth Pages  │                              │
│  │  • Settings │  │  • Login     │                              │
│  │  • Prefs    │  │  • Signup    │                              │
│  └─────────────┘  └──────────────┘                              │
│                                                                   │
└───────────┬────────────────────────────────────────────────────┬─┘
            │                                                      │
         HTTP/REST Calls                                   React State
            │                                                      │
┌───────────▼────────────────────────────────────────────────────▼─┐
│                  NEXT.JS API LAYER (BACKEND)                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  GET /api/movies              POST /api/watchlist                │
│  GET /api/movies/[id]         DELETE /api/watchlist/[id]        │
│  GET /api/recommendations/by-mood                                │
│                                                                   │
└───────────┬────────────────────────────────────────────────────┬─┘
            │                                                      │
      Business Logic                                    External APIs
            │                                                      │
    ┌───────▼─────────┐                                 ┌─────────▼──┐
    │  AI Algorithm   │                                 │  TMDB API  │
    │  • Hybrid       │                                 │  • Movies  │
    │  • Collab.      │                                 │  • Genres  │
    │  • Content      │                                 │  • Trending│
    └────────┬────────┘                                 └────────────┘
             │
┌────────────▼──────────────────────────────────────────────────────┐
│              POSTGRESQL DATABASE (PRISMA ORM)                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Users          Movies          Ratings       Notifications      │
│  ├─ id          ├─ id           ├─ id         ├─ id              │
│  ├─ email       ├─ title        ├─ userId     ├─ userId          │
│  ├─ password    ├─ overview     ├─ movieId    ├─ message         │
│  ├─ prefs       ├─ rating       ├─ rating     ├─ type            │
│  └─ createdAt   └─ genres       └─ review     └─ createdAt       │
│                                                                   │
│  Watchlist      Moods           Recommendations                  │
│  ├─ id          ├─ id           ├─ id                            │
│  ├─ userId      ├─ movieId      ├─ movieId                       │
│  ├─ movieId     ├─ mood         ├─ relatedId                     │
│  ├─ status      ├─ createdAt    └─ similarity                    │
│  └─ addedAt                                                       │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Data Flow

### User Journey: Discovering a Movie

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER SELECTS MOOD                                        │
│    ↓                                                         │
│    (😊 Feel-Good selected)                                  │
│    ↓                                                         │
│    API Request: /api/recommendations/by-mood?mood=feel_good │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. BACKEND PROCESSES REQUEST                                │
│    ↓                                                         │
│    • Identify genres for mood (Comedy, Family, Animation)  │
│    • Query TMDB API with genre filters                     │
│    • Apply rating & popularity filters                     │
│    • Calculate recommendation scores                       │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. MOVIES DISPLAYED                                         │
│    ↓                                                         │
│    Movie Grid Shows:                                        │
│    • Movie Poster                                          │
│    • Title & Rating                                        │
│    • 2 Action Buttons (Watch / Add to List)               │
└─────────────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. USER ACTION                                              │
│    ↓                                                         │
│    Option A: Click "Watch"                                 │
│       → Player opens (placeholder)                         │
│       → Could integrate streaming service                  │
│                                                             │
│    Option B: Click "Add to List"                           │
│       → POST /api/watchlist                               │
│       → Saved to database                                  │
│       → Toast notification shows success                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧠 Recommendation Algorithm

### How Hybrid Recommendations Work

```
┌────────────────────────────────────────────────────┐
│     CALCULATE FINAL RECOMMENDATION SCORE           │
│                                                     │
│  Score = (Content × 0.6) + (Collaborative × 0.4) │
└────────────────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ↓                               ↓

┌──────────────────────┐    ┌──────────────────────┐
│ CONTENT-BASED (60%)  │    │ COLLABORATIVE (40%)  │
├──────────────────────┤    ├──────────────────────┤
│                      │    │                      │
│ 1. Genre Matching   │    │ 1. User Ratings     │
│    (Jaccard Index)  │    │    Pattern Analysis │
│                      │    │                      │
│ 2. Rating Similar   │    │ 2. Similar Users    │
│    to User Taste    │    │    Movie Selection  │
│                      │    │                      │
│ 3. Popularity +     │    │ 3. Co-rated Movies │
│    Vote Count       │    │    Correlation      │
│                      │    │                      │
│ Score: 0.0 - 1.0   │    │ Score: 0.0 - 1.0   │
└──────────────────────┘    └──────────────────────┘
         │                               │
         └───────────────┬───────────────┘
                         ↓
         ┌───────────────────────────────┐
         │   FINAL SCORE (0.0 - 1.0)    │
         │   Sorted by Highest Score    │
         │   Top 20 Returned to UI      │
         └───────────────────────────────┘
```

### Example Calculation

```
Movie: "The Intouchables"

Content-Based Score:
├─ Genre Match: 3/4 user genres = 0.75
├─ Rating Compat: 7.4/10 user avg = 0.92
├─ Popularity: High = 0.95
└─ Content Score = 0.87

Collaborative Score:
├─ Users who rated "About a Boy" (8.0) liked this = 0.88
├─ Genre overlap with similar movies = 0.82
└─ Collaborative Score = 0.85

Final Score = (0.87 × 0.6) + (0.85 × 0.4) = 0.862 ⭐
```

---

## 🎨 UI Components

### Component Hierarchy

```
<App>
├── <Navbar>
│   ├── Logo
│   ├── Nav Links
│   │   ├── Home
│   │   ├── Discover
│   │   ├── Watchlist
│   │   └── Profile
│   └── Auth Links
│       ├── Login
│       └── Signup
│
├── <Home>
│   ├── Hero Section
│   ├── <MoodSelector>
│   │   └── 8 x Mood Buttons
│   │       └── Feel-Good, Thought-Provoking, etc.
│   │
│   └── <MovieGrid>
│       ├── Title "Recommended for You"
│       └── 10-20 x <MovieCard>
│           ├── Image
│           ├── Title
│           ├── Rating Badge
│           ├── Description (on hover)
│           └── Action Buttons
│               ├── Watch
│               └── Add to List
│
└── <Footer>
    ├── Links
    └── Info
```

---

## 📊 Database Schema Relationships

```
User
├── (1:M) Watchlist
├── (1:M) Rating
├── (1:M) Notification
└── (1:1) UserPreference

Movie
├── (1:M) Watchlist
├── (1:M) Rating
└── (1:M) MoodTag

Watchlist
├── (M:1) User
└── (M:1) Movie

Rating
├── (M:1) User
└── (M:1) Movie

MoodTag
└── (M:1) Movie

MovieRecommendation
├── (M:1) Movie (movieId)
└── (M:1) Movie (relatedMovieId)

Notification
└── (M:1) User

UserPreference
└── (1:1) User
```

---

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────┐
│           USER SIGNUP                     │
└──────────────────────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 1. User submits form      │
      │    • Email                │
      │    • Password             │
      │    • Name                 │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 2. Validate input         │
      │    • Email format         │
      │    • Password strength    │
      │    • Email unique?        │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 3. Hash password          │
      │    bcryptjs ($2b round)   │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 4. Save to database       │
      │    Prisma.user.create()   │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 5. Create JWT token       │
      │    Valid 24 hours         │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ 6. Set session cookie     │
      │    HttpOnly flag          │
      └───────────────────────────┘
                  │
                  ↓
      ┌───────────────────────────┐
      │ ✅ Redirect to home       │
      └───────────────────────────┘
```

---

## 🚀 API Response Examples

### GET /api/movies

```json
{
  "page": 1,
  "results": [
    {
      "id": 278,
      "title": "The Shawshank Redemption",
      "overview": "Two imprisoned men bond over a number of years...",
      "poster_path": "/posters/278.jpg",
      "backdrop_path": "/backdrops/278.jpg",
      "vote_average": 9.3,
      "vote_count": 22500,
      "release_date": "1994-09-23",
      "popularity": 95.5
    }
    // ... more movies
  ],
  "total_results": 10000,
  "total_pages": 500
}
```

### GET /api/recommendations/by-mood

```json
{
  "mood": "feel_good",
  "count": 20,
  "movies": [
    {
      "id": 8844,
      "title": "The Intouchables",
      "score": 0.94,
      "reason": "Similar Comedy-Drama to your preferences"
    }
    // ... more recommendations
  ]
}
```

### POST /api/watchlist

```json
{
  "request": {
    "userId": "user123",
    "movieId": 278,
    "status": "to_watch"
  },
  "response": {
    "id": "watchlist-456",
    "userId": "user123",
    "movieId": 278,
    "status": "to_watch",
    "addedAt": "2024-06-26T10:30:00Z"
  }
}
```

---

## 🎯 8 Mood Categories & Genres

```
Mood: FEEL-GOOD 😊
├─ Genres: Comedy, Family, Animation
├─ Keywords: uplifting, heartwarming, funny
└─ Example: "The Intouchables", "Chef", "School of Rock"

Mood: THOUGHT-PROVOKING 🤔
├─ Genres: Drama, Mystery, Thriller
├─ Keywords: intelligent, philosophical, complex
└─ Example: "Inception", "Shutter Island", "Memento"

Mood: THRILLING 😱
├─ Genres: Action, Thriller, Crime
├─ Keywords: intense, suspenseful, exciting
└─ Example: "Mad Max", "John Wick", "Ocean's Eleven"

Mood: EMOTIONAL 😢
├─ Genres: Drama, Romance
├─ Keywords: touching, moving, tearjerker
└─ Example: "The Notebook", "A Walk to Remember"

Mood: HILARIOUS 😂
├─ Genres: Comedy
├─ Keywords: funny, humorous, hilarious
└─ Example: "Superbad", "Bridesmaids", "Hot Fuzz"

Mood: INSPIRING 🌟
├─ Genres: Drama, Biography, Sport
├─ Keywords: motivating, uplifting, hero
└─ Example: "Rocky", "Pursuit of Happyness"

Mood: MIND-BENDING 🔮
├─ Genres: Sci-Fi, Fantasy, Mystery
├─ Keywords: mind-bending, mysterious, surreal
└─ Example: "Interstellar", "The Matrix", "Dune"

Mood: SPOOKY 🎃
├─ Genres: Horror, Thriller
├─ Keywords: scary, eerie, suspenseful
└─ Example: "The Conjuring", "Hereditary", "Get Out"
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
├─ Single column layout
├─ Stacked navigation
├─ Full-width cards
└─ Touch-optimized buttons

Tablet (640px - 1024px)
├─ 2-3 column layout
├─ Horizontal menu
├─ Responsive grid
└─ Medium padding

Desktop (> 1024px)
├─ 4-5 column layout
├─ Full navigation bar
├─ Optimized spacing
└─ Hover effects enabled
```

---

## ⚡ Performance Optimizations

```
Image Optimization
├─ Next.js Image component
├─ TMDB CDN integration
└─ Responsive sizes (500x750, 342x513)

Code Splitting
├─ Per-page bundles
├─ Dynamic imports
└─ Route-based splitting

Caching
├─ HTTP cache headers
├─ Browser caching
└─ ISR (Incremental Static Regeneration)

Database
├─ Indexed columns
├─ Query optimization
├─ Connection pooling
└─ Pagination (limit 20)
```

---

## 🔄 Update Features Available

```
UPDATE User Preferences
├─ Favorite genres
├─ Mood preferences
├─ Notification settings
└─ Theme preference

UPDATE Movie Status
├─ to_watch → watching
├─ watching → watched
└─ Remove from watchlist

UPDATE Ratings
├─ Change rating (0.5 - 10.0)
├─ Add review text
└─ Delete rating
```

---

## 📈 Future Enhancement Ideas

```
Phase 2:
├─ User social network
├─ Movie clubs/groups
├─ Watch parties
└─ Advanced analytics

Phase 3:
├─ Deep learning models
├─ Personalized newsletters
├─ Integration with Netflix/Prime
└─ Mobile app (React Native)

Phase 4:
├─ AI chatbot recommendations
├─ Computer vision for posters
├─ Real-time collaborations
└─ Blockchain ratings
```

---

This architecture provides a scalable, secure, and user-friendly movie recommendation experience! 🎬✨
