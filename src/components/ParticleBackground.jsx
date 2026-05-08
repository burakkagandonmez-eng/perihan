import React, { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 8 + 10}s`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 20 + 15}px`,
      // ❤️ for red hearts, 💮 for the white "rising" flowers
      type: Math.random() > 0.6 ? '💮' : '❤️',
      opacity: Math.random() * 0.5 + 0.4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-50px',
            animationDuration: p.animationDuration,
            animationDelay: p.delay,
            fontSize: p.size,
            opacity: p.opacity,
          }}
        >
          {p.type}
        </div>
      ))}
    </div>
  );
};

export default ParticleBackground;
