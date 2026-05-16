# ProfileHunt 🎯

A modern web application to find and discover social media profiles across multiple platforms instantly.

## Features ✨

- **Smart Search**: Enter a username or paste any profile URL
- **Auto Detection**: Automatically detects platform from URLs
- **Multi-Platform Support**: Search across 8 major social platforms
- **Recent History**: Saves your last 5 searches locally
- **Beautiful UI**: Dark glassmorphism design with animated gradients
- **Quick Actions**: Open profiles or copy links with one click
- **Responsive**: Works perfectly on mobile and desktop

## Supported Platforms 🌐

- Instagram
- TikTok
- X (Twitter)
- YouTube
- Facebook
- LinkedIn
- Snapchat
- GitHub

## Tech Stack 💻

- **React 18.3.1** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Motion (Framer Motion)** - Animations
- **Sonner** - Toast Notifications
- **Lucide React** - Icons
- **Vite** - Build Tool

## How It Works 🚀

1. **Enter Username**: Type any username (e.g., `@johndoe`) or paste a full profile URL
2. **Auto Detection**: App automatically detects the platform from URLs
3. **View Results**: See all platform profiles for that username
4. **Quick Actions**: Click to open or copy profile links
5. **History**: Access recent searches from the history panel

## Usage Examples

```
Username: @elonmusk
URL: https://instagram.com/cristiano
URL: https://github.com/torvalds
```

## Installation & Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── PlatformButton.tsx
│   │   ├── ProfileResults.tsx
│   │   ├── RecentSearches.tsx
│   │   └── SearchInput.tsx
│   ├── utils/
│   │   └── platforms.ts
│   └── App.tsx
└── styles/
    ├── globals.css
    ├── theme.css
    └── index.css
```

## Features Breakdown

### 🔍 Smart Username Extraction
Automatically extracts usernames from various URL formats and handles @ symbols.

### 🎨 Glassmorphism Design
Modern dark UI with backdrop blur, gradient backgrounds, and smooth animations.

### 💾 Local Storage
Recent searches are saved in browser's localStorage for quick access.

### 📱 Responsive Design
Fully responsive grid layout that adapts to mobile and desktop screens.

### ✨ Smooth Animations
Motion-powered animations for search, results, and interactions.

### 🎯 Platform Detection
Smart regex-based platform detection from profile URLs.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Author

Built with React, Tailwind CSS, and Motion

---

**ProfileHunt** - Find anyone across all major social platforms instantly 🚀
