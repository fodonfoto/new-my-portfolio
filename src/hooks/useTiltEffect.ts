import { useState, useRef, useEffect } from 'react';

type TiltEffectProps = {
  perspective?: number;
  maxTilt?: number;
  scaleOnHover?: number;
  disableOnMobile?: boolean;
};

export function useTiltEffect({
  perspective = 1000,
  maxTilt = 10,
  scaleOnHover = 1.05,
  disableOnMobile = true,
}: TiltEffectProps = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile && disableOnMobile) return;
    
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const style = {
    transform: `perspective(${perspective}px) 
                rotateX(${tilt.rotateX}deg) 
                rotateY(${tilt.rotateY}deg)
                scale(${isHovered ? scaleOnHover : 1})`,
    transition: 'transform 0.1s ease-out',
  };

  return {
    ref: elementRef,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
}
