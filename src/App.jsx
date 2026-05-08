import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import Intro from './components/Intro';
import ParticleBackground from './components/ParticleBackground';
import MemoryTunnel from './components/MemoryTunnel';
import { Heart } from 'lucide-react';

const Daisy = ({ scrollProgress, index }) => {
  const start = 0.1 + (index * 0.1);
  const end = 0.4 + (index * 0.1);
  
  const scale = useTransform(scrollProgress, [start, end], [0, 1.3]);
  const opacity = useTransform(scrollProgress, [start, start + 0.05], [0, 1]);
  const stemHeight = useTransform(scrollProgress, [start - 0.05, start + 0.2], [0, 100]);

  return (
    <div className="flex flex-col items-center relative">
      {/* Flower Head */}
      <motion.div
        style={{ scale, opacity, originY: 1 }}
        animate={{ 
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }}
        className="z-10 relative"
      >
        <svg width="110" height="110" viewBox="0 0 100 100" className="filter drop-shadow-lg">
          <defs>
            <radialGradient id={`centerGrad-${index}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#F1C40F" />
              <stop offset="100%" stopColor="#E67E22" />
            </radialGradient>
          </defs>
          {/* Petals with thicker stroke for visibility */}
          {[...Array(18)].map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="6"
              ry="45"
              fill="white"
              stroke="#e0e0e0"
              strokeWidth="1.2"
              transform={`rotate(${i * 20} 50 50)`}
            />
          ))}
          {/* Inner Petal Layer */}
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={`inner-${i}`}
              cx="50"
              cy="50"
              rx="5"
              ry="32"
              fill="#fff"
              stroke="#f0f0f0"
              strokeWidth="0.8"
              transform={`rotate(${i * 30 + 10} 50 50)`}
            />
          ))}
          {/* Center */}
          <circle cx="50" cy="50" r="16" fill={`url(#centerGrad-${index})`} stroke="#D35400" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Realistic Stem with Leaves */}
      <motion.div 
        style={{ height: stemHeight }}
        className="w-2 bg-linear-to-b from-green-400 to-green-600 rounded-full mt-[-25px] origin-bottom relative shadow-sm"
      >
        <motion.div 
          style={{ scale }}
          className="absolute top-1/2 -left-5 w-7 h-3 bg-green-500 rounded-full rotate-[-25deg] origin-right opacity-80" 
        />
        <motion.div 
          style={{ scale }}
          className="absolute top-1/3 -right-5 w-7 h-3 bg-green-500 rounded-full rotate-[25deg] origin-left opacity-80" 
        />
      </motion.div>
    </div>
  );
};

const DaisyGarden = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="flex justify-center gap-2 md:gap-12 mt-10 mb-20 overflow-hidden px-4 min-h-[500px] items-end pb-24">
      {[...Array(5)].map((_, i) => (
        <Daisy key={i} index={i} scrollProgress={scrollYProgress} />
      ))}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-purple-light overflow-x-hidden">
      <audio
        ref={audioRef}
        loop
        src="/canim-annem-perihan.mp3"
      />

      <AnimatePresence>
        {!isOpen && <Intro onOpen={handleOpen} />}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-50"
            style={{ scaleX }}
          />

          <ParticleBackground />

          {/* Hero Section after Open */}
          <header className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8"
            >
              <Heart className="w-16 h-16 text-brand-accent fill-brand-accent mx-auto animate-pulse" />
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 text-yellow-400 animate-bounce">✨</div>
              <div className="absolute -bottom-10 -right-10 text-yellow-400 animate-bounce delay-100">✨</div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="text-5xl md:text-8xl font-bold mb-8 text-gradient-rose px-4"
                style={{ fontFamily: 'var(--font-handwritten)' }}
              >
                Seni çok seviyoruz <br /> canım annem Perihan
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl md:text-2xl text-slate-600 max-w-2xl font-light leading-relaxed px-4"
            >
              Senin sevginle büyüyen, seninle güçlenen bu koca aileden <br />
              sana kocaman bir hediye... Seni çok seviyoruz!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 animate-bounce"
            >
              <p className="text-sm text-slate-400 uppercase tracking-widest">Aşağı Kaydır</p>
            </motion.div>
          </header>

          <MemoryTunnel />

          {/* Closing Section */}
          <footer className="py-40 bg-white flex flex-col items-center justify-center text-center px-6 border-t border-brand-purple">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-5xl md:text-8xl mb-8 text-gradient-rose px-4"
                style={{ fontFamily: 'var(--font-handwritten)' }}
              >
                Seni Her Şeyden <br /> Çok Seviyoruz
              </h2>
              <div className="flex gap-4 justify-center mb-12">
                <Heart className="w-8 h-8 text-brand-accent fill-brand-accent" />
                <Heart className="w-8 h-8 text-brand-accent fill-brand-accent" />
                <Heart className="w-8 h-8 text-brand-accent fill-brand-accent" />
              </div>
              <p className="text-slate-400 text-lg mb-8">
                Her günün kutlu olsun, iyi ki varsın anne...
              </p>
              <DaisyGarden />
            </motion.div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;
