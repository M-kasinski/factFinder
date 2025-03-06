import { HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      className="space-y-4 w-full"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Questions connexes</h2>
      </div>

      <div className="grid gap-3 w-full">
        {questions.map((question, index) => (
          <motion.div key={index} variants={item}>
            <div 
              className={cn(
                "border rounded-md",
                "border-input hover:border-primary/30 transition-colors"
              )}
            >
              <button
                className={cn(
                  "w-full px-4 py-3 flex justify-between items-start text-left", 
                  "bg-background hover:bg-primary/5 transition-colors"
                )}
                onClick={() => onQuestionClick(question)}
              >
                <div className="flex-1 mr-3">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {question}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground mt-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 
