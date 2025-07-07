import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';

// TikTok Icon Component
const TiktokIcon = ({ className }: { className?: string }) => (
  <img 
    src="/tiktok.svg" 
    alt="TikTok" 
    className={className}
  />
);

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
};

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/fodonfoto',
    icon: <Github className="w-5 h-5" />,
    color: 'hover:bg-gray-700',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/niwatyahuadong?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    icon: <Linkedin className="w-5 h-5" />,
    color: 'hover:bg-blue-600',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@nux_design?_t=ZS-8xptiIbvzPt&_r=1h',
    icon: <TiktokIcon className="w-5 h-5 text-white" />,
    color: 'hover:bg-secondary',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/_niwatt_/profilecard/?igsh=MnBmMjBscTR3Y3Rp',
    icon: <Instagram className="w-5 h-5" />,
    color: 'hover:bg-pink-600',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/fodonfoto?mibextid=wwXIfr&mibextid=wwXIfr',
    icon: <Facebook className="w-5 h-5" />,
    color: 'hover:bg-blue-700',
  },
];

export function Social() {
  return (
    <div className="fixed left-8 bottom-0 hidden md:flex flex-col items-center space-y-6 z-50">
      <div className="flex flex-col items-center space-y-6">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300 ${social.color} bg-primary/80 backdrop-blur-sm border border-white/10`}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
      <div className="w-px h-32 bg-gradient-to-t from-secondary to-transparent"></div>
    </div>
  );
}

export default Social;
