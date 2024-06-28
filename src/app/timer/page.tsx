import React from "react";
import ComingSoon from "@/components/ComingSoon"; // Adjust the import path as necessary

const TimerPage: React.FC = () => {
  return (
    <ComingSoon
      title="Timer Feature"
      message="We're fine-tuning our advanced timer to help you track your solving times with precision. Get ready to shave off those milliseconds!"
      emoji="⏱️"
      linkText="Explore Algorithms"
      linkHref="/algs"
    />
  );
};

export default TimerPage;
