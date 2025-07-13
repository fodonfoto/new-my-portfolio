// นำเข้า React hooks และ components ต่างๆ
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderNav from './components/HeaderNav';
import SloganInto from './components/SloganInto';
import About from './components/About';
import Contact from './components/Contact';
import Social from './components/Social';
import Portrait from './components/Portrait';

function App() {
  // สถานะสำหรับการโหลดและตำแหน่งเคอร์เซอร์
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // จำลองการโหลด
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // เอฟเฟกต์การเคลื่อนไหวของเคอร์เซอร์
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // หน้าจอโหลด
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <motion.div
            className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-4 text-lg text-muted-foreground">กำลังโหลด Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* เอฟเฟกต์เคอร์เซอร์แบบกำหนดเอง */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-secondary/20 pointer-events-none z-50"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <HeaderNav />
      <Social />

      <main className="container mx-auto px-0">
        <AnimatePresence>
          {/* ส่วน Hero ประกอบด้วย Slogan และรูปภาพ Portrait */}
          <section className="w-full flex flex-col md:flex-row items-center justify-between mb-24 px-0 md:px-20">
            <div className="w-full md:w-2/1">
              <SloganInto />
            </div>
            <div className="w-[288px] mx-auto md:mx-0">
              <Portrait alt="รูปภาพโปรไฟล์" />
            </div>
          </section>

          <About />
          <Contact />
        </AnimatePresence>
      </main>

      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            2025 Niwat Yahuadong. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;