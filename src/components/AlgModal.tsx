import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AlgModalProps {
  isOpen: boolean;
  onClose: () => void;
  alg: {
    name: string;
    description: string;
    notation: string;
    image: string;
  };
}

const AlgModal: React.FC<AlgModalProps> = ({ isOpen, onClose, alg }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg text-white border border-gray-700 rounded-lg shadow-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-cyan-400">
            {alg.name}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {alg.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center">
          <Image
            src={alg.image}
            alt={alg.name}
            width={300}
            height={300}
            className="rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-6">
          <pre className="bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
            {alg.notation}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlgModal;
