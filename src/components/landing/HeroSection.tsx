import { motion } from "framer-motion";
import { Box, Star, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAnimationReset } from '@/hooks/useAnimationReset';

export function HeroSection() {
  const animationKey = useAnimationReset();
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      <motion.div
        key={pathname + "-hero-content"}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl space-y-8 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <div className="relative group">
            <div className="relative bg-card/50 backdrop-blur-sm border rounded-full py-2 px-6 text-sm text-muted-foreground inline-flex items-center gap-2 transition-all duration-300 hover:bg-card/80">
              <Box className="h-4 w-4" />
              <span>Track Your Speedcubing Progress</span>
              <Star className="h-4 w-4 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        >
          <span className="text-primary">
            Time
          </span>
          {" "}Your Solves,{" "}
          <span className="block mt-2">
            Track Your{" "}
            <span className="text-primary">Journey</span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Track your solves, analyze your progress, and join a community of speedcubers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <Link href="/timer">
            <Button 
              size="lg" 
              className="text-base relative group h-12 px-8 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                Start Solving
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base group h-12 px-8 border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                Explore Features
                <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}