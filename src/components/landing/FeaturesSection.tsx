import { motion } from "framer-motion";
import { Timer, LineChart, Trophy } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Precision Timer",
    description: "Competition-grade timing with inspection mode and penalties.",
    color: "from-blue-500/20 to-blue-500/10"
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Track your progress with detailed statistics and insights.",
    color: "from-green-500/20 to-green-500/10"
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Join online competitions and compare with others.",
    color: "from-yellow-500/20 to-yellow-500/10"
  }
];

export function FeaturesSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative py-24 bg-gradient-to-b from-background to-card/50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional tools designed for speedcubers of all levels
          </p>
        </motion.div>

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
                className="group relative rounded-xl border bg-card/50 backdrop-blur-sm p-6 h-full transition-colors duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`} />
                <div className="relative space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                  >
                    <feature.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 