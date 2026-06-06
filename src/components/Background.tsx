import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export function Background() {
  const { scrollY } = useScroll();
  // Use a faster, smoother spring for the scroll response to reduce delay
  const smoothScrollY = useSpring(scrollY, {
    damping: 40,
    stiffness: 400,
    mass: 0.2,
  });

  const [vh, setVh] = useState(800);
  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  // Fade out the sharp glass parts
  const glassOpacity = useTransform(smoothScrollY, [0, vh * 0.3], [1, 0]);

  // Generate flying droplets that occasionally get sucked into the center
  const droplets = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 200;
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      const size = 3 + Math.random() * 5;
      const duration = 2.5 + Math.random() * 2;
      const delay = Math.random() * 8;

      return { id: i, startX, startY, size, duration, delay };
    });
  }, []);

  // Generate a geometric dot grid constraint to the viewport bounds
  const dots = useMemo(() => {
    const grid = [];
    for (let x = -10; x <= 110; x += 5) {
      for (let y = -10; y <= 110; y += 5) {
        grid.push({ x, y });
      }
    }
    return grid;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center [perspective:1200px] bg-black">
      {/* Dynamic Background Gradients */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,40,70,0.6)_0%,rgba(0,0,0,1)_80%)] will-change-[opacity]"
        style={{ opacity: useTransform(smoothScrollY, [0, vh], [1, 0]) }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(40,20,60,0.5)_0%,rgba(0,0,0,1)_80%)] will-change-[opacity]"
        style={{ opacity: useTransform(smoothScrollY, [0, vh], [0, 1]) }}
      />

      {/* 3D Geometric Dot Grid */}
      <motion.div
        className="absolute inset-[-20%] w-[140%] h-[140%] will-change-transform"
        style={{
          y: useTransform(smoothScrollY, [0, vh], [0, vh * 0.2]),
          scale: useTransform(smoothScrollY, [0, vh], [1, 1.1]),
          opacity: useTransform(smoothScrollY, [0, vh], [1, 0.2]),
          rotateX: useTransform(smoothScrollY, [0, vh], [0, 25]),
          transformStyle: "preserve-3d",
        }}
      >
        {dots.map((dot, i) => {
          // Calculate distance from center to fade out edges radially
          const dist = Math.sqrt(
            Math.pow(dot.x - 50, 2) + Math.pow(dot.y - 50, 2),
          );
          const opacity = Math.max(0, 0.4 - dist / 140);

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: opacity,
                transform: "translateZ(-200px)",
              }}
            />
          );
        })}
      </motion.div>

      {/* Siri-like Fluid Glowing Orb */}
      <motion.div
        className="absolute w-40 h-40 md:w-56 md:h-56 flex items-center justify-center mix-blend-screen"
        style={{
          willChange: "transform",
        }}
        animate={{
          y: [-15, 15, -15],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Flying Droplets */}
        <motion.div style={{ opacity: glassOpacity, pointerEvents: "none" }} className="absolute inset-0 flex items-center justify-center">
          {droplets.map((d) => (
            <motion.div
              key={d.id}
              className="absolute rounded-full bg-teal-400/40 mix-blend-screen pointer-events-none shadow-[0_0_6px_rgba(45,212,191,0.3)]"
              style={{ width: d.size, height: d.size, willChange: "transform, opacity" }}
              initial={{ x: d.startX, y: d.startY, scale: 0, opacity: 0 }}
              animate={{
                x: [d.startX, d.startX * 0.4, 0],
                y: [d.startY, d.startY * 0.4, 0],
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: d.duration,
                repeat: Infinity,
                delay: d.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Deep background glow */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[100px] bg-indigo-500/20 mix-blend-screen"
          style={{ willChange: "transform, opacity" }}
          animate={{ scale: [1, 1.1, 0.9, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 1: Cyan / Emerald core */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/50 via-teal-300/40 to-transparent blur-3xl"
          style={{ opacity: 0.8, willChange: "transform" }}
          animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Layer 2: Pink / Purple core */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-bl from-pink-500/50 via-purple-500/40 to-transparent blur-3xl"
          style={{ opacity: 0.8, willChange: "transform" }}
          animate={{ rotate: [360, 0], scale: [1.1, 0.95, 1.1] }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            },
          }}
        />

        {/* Layer 3: Deep Blue core */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-t from-blue-600/50 to-indigo-400/30 blur-2xl"
          style={{ opacity: 0.9, willChange: "transform" }}
          animate={{
            rotate: [0, 180, 360],
            x: [-10, 15, -10],
            y: [15, -10, 15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Liquid Glass Core */}
        <motion.div
          className="absolute w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mix-blend-screen shadow-[inset_0_4px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(0,0,0,0.2)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            opacity: glassOpacity,
            willChange: "transform, opacity, border-radius",
          }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            borderRadius: [
              "45% 55% 40% 60%",
              "55% 45% 60% 40%",
              "45% 55% 40% 60%",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-2 border border-white/20 shadow-inner mix-blend-overlay"
            style={{ borderRadius: "inherit" }}
          />
          <motion.div
            className="absolute w-1/2 h-1/2 top-2 left-2 rounded-full bg-white/20 blur-md mix-blend-screen"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
