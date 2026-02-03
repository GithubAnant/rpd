# RPD - Research Paper Doomscroller

An addictive, X/Twitter-style feed for browsing arXiv research papers. Discover AI, ML, NLP, and Computer Vision papers with a familiar infinite scroll experience.

## Features

- **X/Twitter-style UI** - Flat design, dark theme, familiar navigation
- **Infinite scroll feed** - Smooth, endless paper browsing
- **Category tabs** - For You, ML, NLP, Vision, Robotics
- **Bookmarks** - Save papers for later reading
- **Individual paper pages** - Deep links for sharing (`/paper/[id]`)
- **Google auth + guest mode** - Optional sign-in
- **Mobile-first** - Optimized for mobile Chrome

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js** for authentication
- **arXiv API** for paper data
- **Vercel Analytics**

## Routes

| Route         | Description            |
| ------------- | ---------------------- |
| `/`           | Landing page with auth |
| `/home`       | Main paper feed        |
| `/paper/[id]` | Individual paper view  |
| `/saved`      | Bookmarked papers      |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Google OAuth credentials and NEXTAUTH_SECRET

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Deploy

Deploy on [Vercel](https://vercel.com) with one click. Analytics are automatically enabled.

## License

MIT
