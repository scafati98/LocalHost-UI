import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface SuggestedQuestionProps {
  question: string;
}

export const SuggestedQuestion = ({ question }: SuggestedQuestionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center gap-3 text-gray-500"
    >
      <MessageCircle className="w-5 h-5" />
      <p className="text-lg font-light">
        Try asking: "<span className="text-primary">{question}</span>"
      </p>
    </motion.div>
  );
}; 