'use client';

import { useAnimationReset } from "@/hooks/useAnimationReset";
import { motion } from "framer-motion";
import { Timer, Book, Code2, Users, Database } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Speedcubing Timer",
    description: "A precise timer with inspection mode and solve statistics",
    color: "from-blue-500/20 to-blue-500/10"
  },
  {
    icon: Code2,
    title: "Scramble Generator",
    description: "WCA-compliant scrambles for all puzzle types",
    color: "from-green-500/20 to-green-500/10"
  },
  {
    icon: Users,
    title: "User Accounts",
    description: "Save your solves and access them anywhere",
    color: "from-purple-500/20 to-purple-500/10"
  }
];

const upcomingFeatures = [
  {
    icon: Database,
    label: "Algorithm Database",
    description: "Learn and practice the most useful algorithms",
  },
  {
    icon: Book,
    label: "Cubing Courses", 
    description: "Structured learning paths for all skill levels"
  },
  {
    icon: Code2,
    label: "Algorithm Trainers",
    description: "Interactive tools to drill specific algorithms and cases"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header Section */}
      <div className="relative py-24 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            key={useAnimationReset()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold">
              Building the Best Tools for <span className="text-primary">Speedcubing</span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A modern, open-source platform designed to help cubers practice, improve, and achieve their best times.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group relative rounded-xl border bg-card/50 backdrop-blur-sm p-8 h-full transition-all duration-300 hover:bg-card"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
                  <div className="relative space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <feature.icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center gap-6 p-8 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <feature.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">{feature.label}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}