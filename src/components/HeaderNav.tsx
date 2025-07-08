import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
const resumePDF = '/Niwat_Yah_CV_2025.pdf';
const logoImage = '/images/n 1.png';

type NavLink = {
  name: string;
  href: string;
  target?: string;
  rel?: string;
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: 'https://fodonfoto.github.io/.com/uxui-product.html', target: '_blank', rel: 'noopener noreferrer' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: resumePDF },
  { name: 'AI Answer', href: '#ai-answer' },
];

// Animation variants for mobile menu
const mobileMenuVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1]
    }
  }
};

export function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <header 
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-primary/95 backdrop-blur-sm shadow-lg' 
          : 'py-4 bg-primary/95 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center h-12 w-12 sm:h-14 sm:w-14 rounded-md overflow-hidden hover:opacity-80 transition-opacity focus:outline-none -ml-2"
            aria-label="Home"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src={logoImage} 
              alt="Niwat Yahuadong Logo"
              className="w-full h-full object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4 bg-primary/95 backdrop-blur-sm px-4 py-2 rounded-lg">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith('#');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-md text-sm lg:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary ${
                    link.name === 'AI Answer'
                      ? 'bg-secondary text-primary hover:bg-secondary/90 shadow-lg hover:shadow-xl'
                      : 'text-white hover:text-secondary focus:ring-secondary'
                  }`}
                  onClick={(e) => {
                    if (isHash) {
                      e.preventDefault();
                      setIsOpen(false);
                      if (link.href === '#') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  {...(!isHash && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden -mr-2 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-primary/95 backdrop-blur-sm shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="pt-2 pb-3 space-y-1 px-2">
                {navLinks.map((link) =>
                  link.href.startsWith('#') ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-secondary/10 hover:text-secondary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        if (link.href === '#') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          const target = document.querySelector(link.href);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-secondary/10 hover:text-secondary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default HeaderNav;