import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo } from "react";

export function Background() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Map mouse coordinates to rotation values for 3D tilt
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  
  // Parallax translation for the central spheres
  const translateX = useTransform(smoothX, [0, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [0, 1], [-20, 20]);

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
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center [perspective:1200px]">
      
      {/* 3D Geometric Dot Grid */}
      <motion.div 
        className="absolute inset-[-20%] w-[140%] h-[140%]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {dots.map((dot, i) => {
          // Calculate distance from center to fade out edges radially
          const dist = Math.sqrt(Math.pow(dot.x - 50, 2) + Math.pow(dot.y - 50, 2));
          const opacity = Math.max(0, 0.4 - (dist / 140));

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: opacity,
                transform: "translateZ(-200px)"
              }}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px] bg-indigo-500/10 mix-blend-screen"
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Central Spheres with slight parallax */}
      <motion.div 
        className="absolute w-48 h-48 rounded-full border border-white/10 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: translateX, y: translateY }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/5"
          animate={{ scale: [1.25, 1.35, 1.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute inset-0 rounded-full border border-white/5"
          animate={{ scale: [1.5, 1.65, 1.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="w-32 h-32 rounded-full bg-gradient-to-b from-white/20 to-transparent flex items-center justify-center shadow-2xl">
          <motion.div 
            className="w-24 h-24 rounded-full border border-white/30 backdrop-blur-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
