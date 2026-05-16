import { motion, AnimatePresence } from 'motion/react';
import { Clock, X } from 'lucide-react';

interface RecentSearch {
  username: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (username: string) => void;
  onClear: () => void;
  onRemove: (index: number) => void;
}

export function RecentSearches({ searches, onSelect, onClear, onRemove }: RecentSearchesProps) {
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
