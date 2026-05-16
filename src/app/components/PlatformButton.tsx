import { motion } from 'motion/react';
import { ExternalLink, Copy, Instagram, Music, Twitter, Youtube, Facebook, Linkedin, Ghost, Github } from 'lucide-react';
import { Platform } from '../utils/platforms';
import { toast } from 'sonner';

interface PlatformButtonProps {
  platform: Platform;
  username: string;
  url: string;
  index: number;
}

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

export function PlatformButton({ platform, username, url, index }: PlatformButtonProps) {
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
