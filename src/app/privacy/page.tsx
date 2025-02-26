'use client';

import { useAnimationReset } from "@/hooks/useAnimationReset";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, FileCheck, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/animatedBackground";

const sections = [ // TODO: add Privacy Policy
  {
    icon: Lock,
    title: "1. Data Collection",
    content: "We collect only essential information needed to provide our services, including solve times, averages, and basic account information.",
    color: "from-blue-500/20 to-blue-500/10"
  },
  {
    icon: Shield,
    title: "2. Data Security",
    content: "Your data is protected using industry-standard security measures. We regularly update our security protocols to ensure your information remains safe.",
    color: "from-green-500/20 to-green-500/10"
  },
  {
    icon: Eye,
    title: "3. Data Usage",
    content: "We use your data to provide and improve our timer services, generate statistics, and enhance your speedcubing experience.",
    color: "from-purple-500/20 to-purple-500/10"
  },
  {
    icon: Database,
    title: "4. Data Storage",
    content: "Your solve data is stored securely in our database and is accessible only to you through your account.",
    color: "from-orange-500/20 to-orange-500/10"
  },
  {
    icon: FileCheck,
    title: "5. Your Rights",
    content: "You have the right to access, modify, or delete your personal data at any time through your account settings.",
    color: "from-red-500/20 to-red-500/10"
  },
  {
    icon: Bell,
    title: "6. Updates",
    content: "We may update this privacy policy occasionally. We will notify you of any significant changes to how we handle your data.",
    color: "from-teal-500/20 to-teal-500/10"
  }
];

const LAST_UPDATED = "02.26.2025"; // Manually update this when you change the terms

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnimatedBackground variant="default" />
      <div className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            key={useAnimationReset()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we handle and protect your data at Icecube Timer
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full group relative rounded-xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-card"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                      >
                        <section.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            <p>Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
