import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useMemo } from "react";

export function Background() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    let hasDeviceOrientation = false;

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        hasDeviceOrientation = true;
        // gamma is left/right (-90 to 90). Normalize around 0.
        // beta is up/down (-180 to 180). Normalize around 45 (typical holding angle).
        const x = Math.min(Math.max((e.gamma + 45) / 90, 0), 1);
        const y = Math.min(Math.max(e.beta / 90, 0), 1);

        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hasDeviceOrientation) return;
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    const requestPermission = async () => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (
            DeviceOrientationEvent as any
          ).requestPermission();
          if (permissionState === "granted") {
            window.addEventListener(
              "deviceorientation",
              handleDeviceOrientation,
            );
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    // Request permission on first click for iOS 13+
    window.addEventListener("click", requestPermission, { once: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      window.removeEventListener("click", requestPermission);
    };
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
        style={{ x: translateX, y: translateY }}
      >
        {/* Deep background glow */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[100px] bg-indigo-500/20 mix-blend-screen"
          animate={{ scale: [1, 1.1, 0.9, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 1: Cyan / Emerald core */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/50 via-teal-300/40 to-transparent blur-3xl opacity-80"
          animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Layer 2: Pink / Purple core */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-bl from-pink-500/50 via-purple-500/40 to-transparent blur-3xl opacity-80"
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
          className="absolute inset-8 rounded-full bg-gradient-to-t from-blue-600/50 to-indigo-400/30 blur-2xl opacity-90"
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
            background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
          animate={{ 
            scale: [0.95, 1.05, 0.95],
            borderRadius: ["45% 55% 40% 60%", "55% 45% 60% 40%", "45% 55% 40% 60%"]
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
