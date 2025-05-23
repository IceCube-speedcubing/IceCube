'use client';

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
        />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Loading Animation */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              rotate: {
                duration: 3,
                ease: "linear",
                repeat: Infinity
              },
              scale: {
                duration: 2,
                repeat: Infinity
              },
              opacity: {
                duration: 2,
                repeat: Infinity
              }
            }}
            className="absolute inset-0 rounded-full border-4 border-primary/20"
          />
          
          {/* Inner spinning circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          />

          {/* Center pulsing circle */}
          <motion.div
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-8 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-8 h-8 rounded-full bg-primary/30"
            />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Loading
          </h2>
          <p className="text-muted-foreground">
            Please wait a moment...
          </p>
        </motion.div>
      </div>
    </div>
  );
} 