import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles } from 'lucide-react';

interface SearchInputProps {
  onSearch: (value: string) => void;
  isLoading?: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
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
