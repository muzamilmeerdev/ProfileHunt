export interface Platform {
  id: string;
  name: string;
  baseUrl: string;
  color: string;
  gradient: string;
  icon: string;
  urlPattern?: RegExp;
}

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
