import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
const logoImage = '/images/n 1.png';

// Animation variants for continuous rotation
const rotateVariants: Variants = {
  animate: (duration = 10) => ({
    rotate: 360,
    transition: {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  }),
};

export function SloganInto() {
  const firstName = 'Neng';
  const title = 'Product Designer (UX/UI)';
  
  // Animate the first name and title separately
  const animatedFirstName = useTypingAnimation(firstName, 100, false);
  const animatedTitle = useTypingAnimation(title, 100, true);
  return (
    <section className="-mx-4 sm:mx-0 mt-64 md:mt-0 mb-16 md:min-h-screen flex items-start md:items-center justify-center relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full px-4 sm:px-8 py-4 mx-8 sm:py-8 md:py-32 md:mx-8 bg-primary rounded-[20px] relative">
        {/* Flower Icon with Rotation Animation */}
        <motion.div 
          className="absolute top-6 right-6 w-12 h-12 sm:w-[120px] sm:h-[120px] z-10"
          variants={rotateVariants}
          animate="animate"
          custom={10} // Duration in seconds
        >
          <img 
            src={logoImage} 
            alt="Niwat Yahuadong Logo"
            className="w-16 h-16 sm:w-full sm:h-full object-contain"
          />
        </motion.div>
        <div className="w-full text-left">
          <h1 className="text-2xl md:text-6xl font-bold text-white mb-6 leading-tight">
            I'm <span className="text-secondary">{animatedFirstName}</span>,
            <br />
            <span className="text-2xl md:text-5xl font-medium">
              {animatedTitle}
              <span className="inline-block w-1 h-8 bg-white ml-1 animate-pulse"></span>
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary bg-secondary hover:bg-secondary/90 transition-colors"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://fodonfoto.github.io/.com/uxui-product.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white border border-white/20 hover:bg-secondary hover:text-primary transition-colors"
            >
              View Project
            </a>
                      </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default SloganInto;
