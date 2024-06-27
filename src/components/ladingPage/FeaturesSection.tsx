import Image from "next/image";
import { Clock, Users, BookOpen, Zap, Target, Award } from "lucide-react";

// TODO: Consider creating a separate types file for shared interfaces
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

function FeatureBlock({
  imageOnRight,
  imageSrc,
  title,
  features,
}: FeatureBlockProps) {
  const ImageContainer = () => (
    <div className="w-full md:w-1/2 mb-8 md:mb-0">
      <div className="relative group">
        {/* TODO: Consider making the gradient colors customizable props */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#0A4779] to-[#0D2E4D] rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          {/* TODO: Adjust opacity and blur values for optimal visual effect */}
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
          <div className="relative p-6">
            {/* TODO: Implement lazy loading for images */}
            <Image
              src={imageSrc}
              alt="Speedcubing Features"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg transform transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ContentContainer = () => (
    <div className="w-full md:w-1/2 md:px-12">
      {/* TODO: Implement a reusable gradient text component */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
        {title}
      </h2>
      <ul className="space-y-8">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start transition-all duration-300 hover:translate-x-2"
          >
            {/* TODO: Consider making the icon background color a prop */}
            <div className="flex-shrink-0 w-12 h-12 bg-[#0A4779] rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-300">{feature.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
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
    </div>
  );
}

export function FeaturesSection() {
  // TODO: Consider fetching this data from an API or CMS for easier content management
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 space-y-16 md:space-y-32">
      <FeatureBlock
        imageOnRight={false}
        imageSrc="/images/IceCube-logo.png"
        title="Unlock Your Full Potential"
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

// TODO: Add responsive design improvements for smaller screens
// TODO: Implement animations or transitions when scrolling to this section
// TODO: Add accessibility features (e.g., aria labels, keyboard navigation)
// TODO: Optimize performance by using React.memo or useMemo where appropriate
// TODO: Add unit tests for the FeatureBlock component
