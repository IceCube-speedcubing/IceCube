import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className={`animate-spin text-[#0A4779] ${className || 'h-12 w-12'}`} />
    </div>
  );
};

export default LoadingSpinner;
