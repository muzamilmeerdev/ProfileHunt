import { motion } from 'motion/react';

export function AnimatedBackground() {
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
