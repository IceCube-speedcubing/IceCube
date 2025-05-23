'use client';

import { useAnimationReset } from "@/hooks/useAnimationReset";
import { motion } from "framer-motion";
import { Shield, Scale, Lock, FileText, UserX, Edit } from "lucide-react";
import { AnimatedBackground } from "@/components/animatedBackground";

const sections = [ // TODO: add Terms of Service
  {
    icon: FileText,
    title: "1. Terms of Use",
    content: "By accessing and using Icecube Timer, you agree to comply with these terms and conditions. The service is provided 'as is' without warranties of any kind.",
    color: "from-blue-500/20 to-blue-500/10"
  },
  {
    icon: Lock,
    title: "2. Privacy & Security",
    content: "We respect your privacy and are committed to protecting your personal data. We only collect necessary information to improve your experience.",
    color: "from-green-500/20 to-green-500/10"
  },
  {
    icon: Scale,
    title: "3. Fair Use",
    content: "Users are expected to use the service responsibly. Any attempt to manipulate, abuse, or disrupt the service is strictly prohibited.",
    color: "from-purple-500/20 to-purple-500/10"
  },
  {
    icon: Shield,
    title: "4. Data Protection",
    content: "We implement appropriate security measures to protect your data. However, no method of transmission over the internet is 100% secure.",
    color: "from-orange-500/20 to-orange-500/10"
  },
  {
    icon: UserX,
    title: "5. Account Termination",
    content: "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.",
    color: "from-red-500/20 to-red-500/10"
  },
  {
    icon: Edit,
    title: "6. Modifications",
    content: "We reserve the right to modify or replace these terms at any time. It is your responsibility to check these terms periodically for changes.",
    color: "from-teal-500/20 to-teal-500/10"
  }
];

const LAST_UPDATED = "02.26.2025"; // Manually update this when you change the terms

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
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
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using Icecube Timer
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
