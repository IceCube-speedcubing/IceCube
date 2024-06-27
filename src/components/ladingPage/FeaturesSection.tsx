'use client';

import Image from "next/image";
import { Clock, Users, BookOpen, Zap, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { memo, useState, useEffect } from 'react';

interface FeatureBlockProps {
  imageOnRight: boolean;
  imageSrc: string;
  title: string;
  features: {
    icon: React.ReactNode;
    title: string;
    text: string;
  }[];
}

const FeatureBlock = memo(({
  imageOnRight,
  imageSrc,
  title,
  features,
}: FeatureBlockProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
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

  const ImageContainer = () => (
    <motion.div 
      className="w-full md:w-1/2 mb-8 md:mb-0"
      variants={itemVariants}
    >
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-[#0A4779] to-[#0D2E4D] rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
          <div className="relative p-6">
            <Image
              src={imageSrc}
              alt="Speedcubing Features"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg transform transition-all duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ContentContainer = () => (
    <motion.div 
      className="w-full md:w-1/2 md:px-12"
      variants={itemVariants}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
        {title}
      </h2>
      <ul className="space-y-8">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start transition-all duration-300 hover:translate-x-2"
            variants={itemVariants}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-[#0A4779] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#0D2E4D]">
              {feature.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-300">{feature.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <motion.div 
      ref={ref}
      className="max-w-7xl mx-auto flex flex-col md:flex-row items-center"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {imageOnRight ? (
        <>
          <ContentContainer />
          <ImageContainer />
        </>
      ) : (
        <>
          <ImageContainer />
          <ContentContainer />
        </>
      )}
    </motion.div>
  );
});

FeatureBlock.displayName = 'FeatureBlock';

export function FeaturesSection() {
  const [headline, setHeadline] = useState("Unlock Your Full Potential");

  // Simple A/B testing for headline
  useEffect(() => {
    const headlines = [
      "Unlock Your Full Potential",
      "Master the Art of Speedcubing",
      "Accelerate Your Cubing Skills"
    ];
    setHeadline(headlines[Math.floor(Math.random() * headlines.length)]);
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 space-y-16 md:space-y-32">
      <FeatureBlock
        imageOnRight={false}
        imageSrc="/images/IceCube-logo.png"
        title={headline}
        features={[
          {
            icon: <BookOpen className="w-6 h-6 text-white" />,
            title: "Comprehensive Library",
            text: "Master advanced algorithms with our extensive collection",
          },
          {
            icon: <Clock className="w-6 h-6 text-white" />,
            title: "Progress Tracking",
            text: "Analyze your solving times and see your improvement",
          },
          {
            icon: <Users className="w-6 h-6 text-white" />,
            title: "Global Community",
            text: "Connect with speedcubing enthusiasts worldwide",
          },
        ]}
      />
      <FeatureBlock
        imageOnRight={true}
        imageSrc="/images/IceCube-logo.png"
        title="Elevate Your Speedcubing Game"
        features={[
          {
            icon: <Zap className="w-6 h-6 text-white" />,
            title: "Interactive Tutorials",
            text: "Step-by-step guides for various solving methods",
          },
          {
            icon: <Target className="w-6 h-6 text-white" />,
            title: "Virtual Competitions",
            text: "Participate in challenges and test your skills",
          },
          {
            icon: <Award className="w-6 h-6 text-white" />,
            title: "Personalized Coaching",
            text: "Get tailored recommendations to boost your performance",
          },
        ]}
      />
    </section>
  );
}

// TODO: Add unit tests for the FeatureBlock component
// TODO: Implement internationalization (i18n) for multi-language support
