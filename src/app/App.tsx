import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { Target } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SearchInput } from './components/SearchInput';
import { ProfileResults } from './components/ProfileResults';
import { RecentSearches } from './components/RecentSearches';
import { platforms, extractUsername, detectPlatform } from './utils/platforms';

interface RecentSearch {
  username: string;
  timestamp: number;
}

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('profilehunt-recent');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent searches');
      }
    }
  }, []);

  const saveRecentSearch = (username: string) => {
    const newSearch: RecentSearch = {
      username,
      timestamp: Date.now(),
    };

    const updated = [newSearch, ...recentSearches.filter(s => s.username !== username)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('profilehunt-recent', JSON.stringify(updated));
  };

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchValue(value);

    setTimeout(() => {
      const detected = detectPlatform(value);

      if (detected) {
        const username = detected.username;
        setCurrentUsername(username);
        saveRecentSearch(username);
        toast.success(`Found ${detected.platform.name} profile!`);
      } else {
        const username = extractUsername(value);
        setCurrentUsername(username);
        saveRecentSearch(username);
        toast.success('Searching across all platforms!');
      }

      setIsLoading(false);
    }, 600);
  };

  const handleSelectRecent = (username: string) => {
    setCurrentUsername(username);
    setSearchValue(username);
    toast.success('Loaded from history!');
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('profilehunt-recent');
    toast.success('Search history cleared!');
  };

  const handleRemoveRecent = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem('profilehunt-recent', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 dark overflow-auto">
      <AnimatedBackground />
      <Toaster position="top-center" richColors />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10">
              <Target className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            ProfileHunt
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find anyone across all major social platforms instantly. Enter a username or paste any profile URL.
          </p>
        </motion.div>

        <SearchInput onSearch={handleSearch} isLoading={isLoading} />

        {currentUsername && !isLoading && (
          <ProfileResults username={currentUsername} platforms={platforms} />
        )}

        <RecentSearches
          searches={recentSearches}
          onSelect={handleSelectRecent}
          onClear={handleClearRecent}
          onRemove={handleRemoveRecent}
        />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-sm text-muted-foreground"
        >
          <p>Built with React, Tailwind CSS, and Motion</p>
        </motion.footer>
      </div>
    </div>
  );
}