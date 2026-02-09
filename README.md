![Xapers Demo](/readme/demo.png)

# Xapers

**Xapers** (formerly Arxiv Doomscroller) is an addictive, X/Twitter-style feed for browsing arXiv research papers. Discover the latest in AI, ML, NLP, and Computer Vision with a familiar infinite scroll experience.

## Inspiration

This project was heavily inspired by **[Xikipedia](https://xikipedia.org)** by **[Rebane](https://x.com/rebane2001)** (@rebane2001).
The idea of a "doomscroller" interface for academic content was too good not to build for arXiv papers!

## Features

- **X/Twitter-style UI** - Flat design, dark theme, familiar navigation
- **Infinite Scroll Feed** - Smooth, endless paper browsing
- **Visuals** - Generated sci-fi abstract covers for paper categories
- **PWA Support** - Installable on mobile and desktop
- **Categories** - Custom feeds for AI, ML, NLP, Vision, Robotics, Physics, and Math
- **Bookmarks** - Save papers for later reading

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js** (Google Auth)
- **arXiv API**
- **Vercel Analytics**

## Getting Started

1.  **Clone the repo**

    ```bash
    git clone https://github.com/GithubAnant/xapers.git
    cd xapers
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy `.env.example` to `.env.local` and add your credentials:

    ```bash
    cp .env.example .env.local
    ```

4.  **Run Development Server**

    ```bash
    npm run dev
    ```

5.  **Open** [http://localhost:3000](http://localhost:3000)

## License

MIT
