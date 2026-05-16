import { motion } from 'motion/react';
import { PlatformButton } from './PlatformButton';
import { Platform, generateProfileUrl } from '../utils/platforms';

interface ProfileResultsProps {
  username: string;
  platforms: Platform[];
}

export function ProfileResults({ username, platforms }: ProfileResultsProps) {
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
