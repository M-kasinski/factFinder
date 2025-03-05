import { HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RelatedQuestionsProps {
  questions: string[];
  isVisible: boolean;
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestions({ questions, isVisible, onQuestionClick }: RelatedQuestionsProps) {
  if (!isVisible || !questions.length) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-4"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Questions connexes</h2>
      </div>

      <div className="grid gap-3">
        {questions.map((question, index) => (
          <motion.div key={index} variants={item}>
            <Button
              variant="outline"
              className="w-full h-auto justify-between group hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300"
              onClick={() => onQuestionClick(question)}
            >
              <span className="text-sm text-left font-medium">{question}</span>
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 
