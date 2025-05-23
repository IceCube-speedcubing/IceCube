'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { AnimatedBackground } from "@/components/animatedBackground";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden">
      <AnimatedBackground variant="error" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          {/* Error Icon */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-destructive/20 blur-2xl"
            />
            <div className="relative h-full rounded-full border-4 border-destructive/30 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
              >
                <RefreshCcw className="w-16 h-16 text-destructive" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-bold text-destructive">
              Something went wrong!
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              An error occurred while processing your request.
              Please try again or contact support if the problem persists.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={reset}
              size="lg"
              variant="destructive"
              className="h-12 px-8 bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70"
            >
              <RefreshCcw className="mr-2 h-4 w-4 transition-all group-hover:rotate-180 duration-500" />
              Try Again
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 