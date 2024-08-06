import { Background } from "@/components/Background";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Trash2,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

const privacyPolicy = [
  {
    title: "1. Information Collection",
    content:
      "We collect information you provide directly to us when using our service.",
    icon: <Shield className="w-8 h-8 text-blue-400 mb-2" />,
  },
  {
    title: "2. Data Security",
    content:
      "We implement measures designed to protect your information from unauthorized access or disclosure.",
    icon: <Lock className="w-8 h-8 text-green-400 mb-2" />,
  },
  {
    title: "3. Use of Information",
    content:
      "We use the information we collect to operate, maintain, and provide you with the features and functionality of the service.",
    icon: <Eye className="w-8 h-8 text-yellow-400 mb-2" />,
  },
  {
    title: "4. Data Storage",
    content:
      "Your information may be transferred to, and maintained on, computers located outside of your state, country, or other governmental jurisdiction.",
    icon: <Database className="w-8 h-8 text-purple-400 mb-2" />,
  },
  {
    title: "5. Data Deletion",
    content:
      "You can request deletion of your personal information by contacting us.",
    icon: <Trash2 className="w-8 h-8 text-red-400 mb-2" />,
  },
  {
    title: "6. Policy Updates",
    content:
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    icon: <RefreshCw className="w-8 h-8 text-orange-400 mb-2" />,
  },
  {
    title: "7. Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us.",
    icon: <HelpCircle className="w-8 h-8 text-indigo-400 mb-2" />,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Background />
      <MaxWidthWrapper className="relative z-10">
        <div className="pt-24 md:pt-32 pb-12 md:pb-16 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-center">
            Privacy Policy
          </h1>
          <div className="mt-3 text-lg md:text-xl text-gray-300 max-w-4xl text-center mb-12 px-4">
            We value your privacy. This policy outlines how we handle your
            information.
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyPolicy.map((section, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-40 backdrop-blur-md p-6 rounded-lg flex flex-col"
              >
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-bold text-white ml-3">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
