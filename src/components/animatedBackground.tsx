"use client";

import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "default" | "error" | "primary";
}

export function AnimatedBackground({
  variant = "default",
}: AnimatedBackgroundProps) {
  const gradientColors = {
    default: "from-primary/20",
    error: "from-destructive/20",
    primary: "from-primary/30",
  };

  return (
    <>
      {/* Base gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientColors[variant]} via-background/80 to-background transition-all duration-300`}
        />
      </motion.div>

      {/* Enhanced texture layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-20"
        />
      </motion.div>

      {/* Pulsing overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.08, 0.15, 0.08, 0] 
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
      />

      {/* Additional subtle floating particles effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(40px_circle_at_center,rgba(var(--primary),0.15),transparent)] animate-pulse" />
      </motion.div>
    </>
  );
}
