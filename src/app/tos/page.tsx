import { Background } from "@/components/Background";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  CheckCircle,
  Shield,
  Copyright,
  UserX,
  Edit,
  Mail,
  FileText,
} from "lucide-react";

const termsOfService = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using our service, you agree to be bound by these Terms of Service.",
    icon: <FileText className="w-8 h-8 text-blue-400 mb-2" />,
  },
  {
    title: "2. Use of Service",
    content:
      "You agree to use our service only for lawful purposes and in accordance with these Terms.",
    icon: <CheckCircle className="w-8 h-8 text-green-400 mb-2" />,
  },
  {
    title: "3. User Accounts",
    content:
      "You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.",
    icon: <Shield className="w-8 h-8 text-yellow-400 mb-2" />,
  },
  {
    title: "4. Intellectual Property",
    content:
      "The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
    icon: <Copyright className="w-8 h-8 text-purple-400 mb-2" />,
  },
  {
    title: "5. Termination",
    content:
      "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.",
    icon: <UserX className="w-8 h-8 text-red-400 mb-2" />,
  },
  {
    title: "6. Changes to Terms",
    content:
      "We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.",
    icon: <Edit className="w-8 h-8 text-orange-400 mb-2" />,
  },
  {
    title: "7. Contact Us",
    content: "If you have any questions about these Terms, please contact us.",
    icon: <Mail className="w-8 h-8 text-indigo-400 mb-2" />,
  },
];

export default function TermsOfService() {
  return (
    <>
      <Background />
      <MaxWidthWrapper className="relative z-10">
        <div className="pt-24 md:pt-32 pb-12 md:pb-16 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 text-center">
            Terms of Service
          </h1>
          <div className="mt-3 text-lg md:text-xl text-gray-300 max-w-4xl text-center mb-12 px-4">
            Please read these terms carefully before using our service.
          </div>

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {termsOfService.map((section, index) => (
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
