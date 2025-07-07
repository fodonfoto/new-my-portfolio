import { motion } from 'framer-motion';
import { useTiltEffect } from '../hooks/useTiltEffect';

type PortraitProps = {
  imageUrl: string;
  alt?: string;
};

export function Portrait({ imageUrl, alt = 'Portrait' }: PortraitProps) {
  const tiltEffect = useTiltEffect({
    perspective: 1000,
    maxTilt: 10,
    scaleOnHover: 1.03,
    disableOnMobile: true
  });

  return (
    <div className="relative w-[288px] mx-auto">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl w-full"
          style={tiltEffect.style}
          onMouseMove={tiltEffect.onMouseMove}
          onMouseLeave={tiltEffect.onMouseLeave}
          onMouseEnter={tiltEffect.onMouseEnter}
          ref={tiltEffect.ref}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto object-cover"
            width="288"
            height="auto"
          />
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-secondary/5 rounded-full -z-10"></div>
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 border-2 border-secondary/30 rounded-2xl -z-20"
        initial={{ x: -10, y: -10, opacity: 0 }}
        animate={{ x: 10, y: 10, opacity: 1 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

export default Portrait;
