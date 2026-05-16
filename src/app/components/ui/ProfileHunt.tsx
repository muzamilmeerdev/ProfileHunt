/**
 * ProfileHunt - Complete Application Code
 * Developer: Muzamil Meer (@muzamilmeerdev)
 * Contact: +91 9103594759
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import {
  Target, Search, Sparkles, Clock, X, ExternalLink, Copy,
  Instagram, Music, Twitter, Youtube, Facebook, Linkedin, Ghost, Github
} from 'lucide-react';

// ==================== TYPES & INTERFACES ====================

interface Platform {
  id: string;
  name: string;
  baseUrl: string;
  color: string;
  gradient: string;
  icon: string;
  urlPattern?: RegExp;
}

interface RecentSearch {
  username: string;
  timestamp: number;
}

// ==================== PLATFORM DATA ====================

export const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    baseUrl: 'https://instagram.com/',
    color: '#E4405F',
    gradient: 'from-purple-600 via-pink-600 to-orange-500',
    icon: 'instagram',
    urlPattern: /(?:instagram\.com|instagr\.am)\/([a-zA-Z0-9_.]+)/
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    baseUrl: 'https://tiktok.com/@',
    color: '#000000',
    gradient: 'from-cyan-500 via-black to-pink-500',
    icon: 'music',
    urlPattern: /tiktok\.com\/@([a-zA-Z0-9_.]+)/
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    baseUrl: 'https://x.com/',
    color: '#1DA1F2',
    gradient: 'from-blue-400 to-blue-600',
    icon: 'twitter',
    urlPattern: /(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/
  },
  {
    id: 'youtube',
    name: 'YouTube',
    baseUrl: 'https://youtube.com/@',
    color: '#FF0000',
    gradient: 'from-red-600 to-red-500',
    icon: 'youtube',
    urlPattern: /youtube\.com\/@([a-zA-Z0-9_]+)/
  },
  {
    id: 'facebook',
    name: 'Facebook',
    baseUrl: 'https://facebook.com/',
    color: '#1877F2',
    gradient: 'from-blue-600 to-blue-700',
    icon: 'facebook',
    urlPattern: /facebook\.com\/([a-zA-Z0-9.]+)/
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    baseUrl: 'https://linkedin.com/in/',
    color: '#0A66C2',
    gradient: 'from-blue-700 to-blue-800',
    icon: 'linkedin',
    urlPattern: /linkedin\.com\/in\/([a-zA-Z0-9-]+)/
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    baseUrl: 'https://snapchat.com/add/',
    color: '#FFFC00',
    gradient: 'from-yellow-400 to-yellow-300',
    icon: 'ghost',
    urlPattern: /snapchat\.com\/add\/([a-zA-Z0-9._-]+)/
  },
  {
    id: 'github',
    name: 'GitHub',
    baseUrl: 'https://github.com/',
    color: '#181717',
    gradient: 'from-gray-800 to-gray-900',
    icon: 'github',
    urlPattern: /github\.com\/([a-zA-Z0-9-]+)/
  }
];

// ==================== UTILITY FUNCTIONS ====================

export function detectPlatform(input: string): { platform: Platform; username: string } | null {
  const trimmedInput = input.trim();

  for (const platform of platforms) {
    if (platform.urlPattern) {
      const match = trimmedInput.match(platform.urlPattern);
      if (match) {
        return { platform, username: match[1] };
      }
    }
  }

  return null;
}

export function extractUsername(input: string): string {
  const detected = detectPlatform(input);
  if (detected) {
    return detected.username;
  }

  const cleaned = input.trim().replace(/^@/, '');
  return cleaned;
}

export function generateProfileUrl(platform: Platform, username: string): string {
  const cleanUsername = username.replace(/^@/, '');

  if (platform.id === 'tiktok' || platform.id === 'youtube') {
    return `${platform.baseUrl}${cleanUsername}`;
  }

  return `${platform.baseUrl}${cleanUsername}`;
}

// ==================== ICON MAP ====================

const iconMap: Record<string, any> = {
  instagram: Instagram,
  music: Music,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
  ghost: Ghost,
  github: Github,
};

// ==================== ANIMATED BACKGROUND COMPONENT ====================

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30"
        animate={{
          background: [
            'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
          ],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-30"
        animate={{
          background: [
            'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          ],
          scale: [1.2, 1, 1.2],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

// ==================== SEARCH INPUT COMPONENT ====================

interface SearchInputProps {
  onSearch: (value: string) => void;
  isLoading?: boolean;
}

function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-all duration-300" />

        <div className="relative flex items-center backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 rounded-2xl overflow-hidden">
          <div className="pl-5 pr-3">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter username or paste profile URL..."
            className="flex-1 bg-transparent py-4 pr-4 outline-none placeholder:text-muted-foreground/60 text-white"
            disabled={isLoading}
          />

          <motion.button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="mr-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={value.trim() && !isLoading ? { scale: 1.05 } : {}}
            whileTap={value.trim() && !isLoading ? { scale: 0.95 } : {}}
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Search</span>
            </div>
          </motion.button>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-muted-foreground mt-3"
      >
        Enter a username like <span className="text-purple-400">@johndoe</span> or paste any profile URL
      </motion.p>
    </motion.form>
  );
}

// ==================== PLATFORM BUTTON COMPONENT ====================

interface PlatformButtonProps {
  platform: Platform;
  username: string;
  url: string;
  index: number;
}

function PlatformButton({ platform, username, url, index }: PlatformButtonProps) {
  const Icon = iconMap[platform.icon];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    toast.success(`${platform.name} link copied!`);
  };

  const handleOpen = () => {
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="group relative overflow-hidden rounded-2xl cursor-pointer"
        onClick={handleOpen}
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(135deg, ${platform.color}22, ${platform.color}44)`
          }}
        />

        <div className="relative backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                className="p-2.5 rounded-xl bg-gradient-to-br"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}33, ${platform.color}66)`
                }}
                whileHover={{ rotate: 5 }}
              >
                {Icon && <Icon className="w-5 h-5" style={{ color: platform.color }} />}
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{platform.name}</p>
                <p className="text-foreground truncate">@{username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="w-4 h-4 text-muted-foreground" />
              </motion.button>

              <motion.button
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== PROFILE RESULTS COMPONENT ====================

interface ProfileResultsProps {
  username: string;
  platforms: Platform[];
}

function ProfileResults({ username, platforms }: ProfileResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl mb-2">
          Profiles for <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">@{username}</span>
        </h2>
        <p className="text-sm text-muted-foreground">Click any platform to open the profile</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform, index) => (
          <PlatformButton
            key={platform.id}
            platform={platform}
            username={username}
            url={generateProfileUrl(platform, username)}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ==================== RECENT SEARCHES COMPONENT ====================

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (username: string) => void;
  onClear: () => void;
  onRemove: (index: number) => void;
}

function RecentSearches({ searches, onSelect, onClear, onRemove }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="backdrop-blur-xl bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm text-muted-foreground">Recent Searches</h3>
          </div>
          <motion.button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        </div>

        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {searches.map((search, index) => (
              <motion.div
                key={`${search.username}-${search.timestamp}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                onClick={() => onSelect(search.username)}
              >
                <span className="text-sm">@{search.username}</span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== MAIN APP COMPONENT ====================

export default function ProfileHunt() {
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
          className="text-center mt-16 space-y-2"
        >
          <p className="text-sm text-muted-foreground">
            Built with React, Tailwind CSS, and Motion
          </p>
          <p className="text-sm text-purple-400">
            Developed by <span className="font-medium">Muzamil Meer</span> (@muzamilmeerdev)
          </p>
          <p className="text-xs text-muted-foreground">
            Contact: <a href="tel:+919103594759" className="text-purple-400 hover:underline">+91 9103594759</a>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
