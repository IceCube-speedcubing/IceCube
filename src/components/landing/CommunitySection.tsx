import { motion } from "framer-motion";
import { Users, Github, Box, TestTube, MessageSquare, Lightbulb, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const communityCards = [
  {
    icon: TestTube,
    title: "Beta Testing",
    description: "Be among the first to test new features and shape the future of our timer",
  },
  {
    icon: MessageSquare,
    title: "Share Feedback",
    description: "Your feedback matters! Help us improve and build the best cube timer possible",
  },
  {
    icon: Lightbulb,
    title: "Share Ideas",
    description: "Got ideas? Join our community discussions and help innovate together",
  }
];

async function getGitHubStars() {
  try {
    const response = await fetch('https://api.github.com/repos/IceCube-speedcubing/IceCube');
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return null;
  }
}

export function CommunitySection() {
  const pathname = usePathname();
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    getGitHubStars().then(count => setStarCount(count));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      key={pathname + "-community"}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative py-24 bg-gradient-to-b from-card/50 to-background"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-primary/5 backdrop-blur-sm mb-6"
          >
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Join Our Community
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
            Help Us Build Something Amazing
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our growing community and help shape the future of speedcubing
          </p>
        </motion.div>

        {/* Dark Fields Container */}
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {/* Community Cards Field */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 rounded-2xl border bg-card/95"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="relative rounded-xl border bg-card/50 p-6 h-full transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                      >
                        <card.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                      <p className="text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links Field */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 rounded-2xl border bg-card/95 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GitHub Button */}
              <Link
                href="https://github.com/IceCube-speedcubing/IceCube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div className="relative rounded-xl border border-zinc-800 bg-[#0D1117] p-6 transition-all duration-300 hover:bg-[#161B22] hover:border-zinc-700">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                            <Github className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            GitHub
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#1D2432] px-2.5 py-0.5 rounded-md text-zinc-300 group-hover:bg-[#24292F] transition-colors">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400/20" />
                          <span className="text-sm">
                            {starCount !== null ? starCount.toLocaleString() : '•••'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-400">
                          Star the repository
                        </span>
                        <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
                  </div>
                </motion.div>
              </Link>

              {/* Discord Button */}
              <Link
                href="https://discord.gg/AaEngvyxrC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <div className="relative rounded-xl border border-zinc-800 bg-[#0D1117] p-6 transition-all duration-300 hover:bg-[#5865F2]/10 hover:border-[#5865F2]/50">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                            <Box className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            Discord
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#1D2432] px-2.5 py-0.5 rounded-md text-zinc-300 group-hover:bg-[#24292F] transition-colors">
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-green-500/50 shadow-[0_0_8px_1px_rgba(34,197,94,0.3)]"></div>
                          <span className="text-sm">Online</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-400">
                          Join our community
                        </span>
                        <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5865F2]/10 via-[#5865F2]/5 to-[#5865F2]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 