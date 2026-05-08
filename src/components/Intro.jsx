import React from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-purple-light">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <div className="relative mb-8 cursor-pointer group" onClick={onOpen}>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="w-64 h-64 mx-auto relative z-10"
          >
            {/* We'll use the generated image here. 
                In a real scenario, this would be a static asset.
                For now, we'll use a placeholder and describe where the image goes. */}
            <img
              src="/gift_box_mothers_day.png"
              alt="Gift"
              className="w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/4213/4213958.png';
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl text-brand-accent mb-8"
          style={{ fontFamily: 'var(--font-handwritten)' }}
        >
          Canım Annem Perihan...
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          className="px-8 py-4 bg-brand-accent text-white rounded-full text-xl font-medium shadow-lg hover:bg-brand-accent/90 transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          Hediyeni Aç 🎁
        </motion.button>

        <p className="mt-4 text-slate-500/60 text-sm animate-pulse">
          Lütfen sesi açmayı unutma ✨
        </p>
      </motion.div>
    </div>
  );
};

export default Intro;
