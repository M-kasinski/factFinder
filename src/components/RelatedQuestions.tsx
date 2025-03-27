import { HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RelatedQuestionsProps {
  questions: string[];
  isVisible: boolean;
  onQuestionClick: (question: string) => void;
}

// Skeleton loader pour les questions associées
const RelatedQuestionsSkeleton = () => (
  <div>
    <div className="flex items-center gap-2">
      <HelpCircle className="h-5 w-5 text-primary/50" />
      <div className="h-6 w-36 bg-muted-foreground/20 rounded-lg animate-pulse" />
    </div>
    
    <div className="mt-4 flex flex-wrap gap-3">
      {[...Array(5)].map((_, index) => (
        <div 
          key={index} 
          className="animate-pulse px-4 py-2 rounded-full bg-muted w-28 h-9 sm:w-36"
        />
      ))}
    </div>
  </div>
);

export function RelatedQuestions({ questions, isVisible, onQuestionClick }: RelatedQuestionsProps) {
  if (!isVisible) return null;
  
  // Afficher le skeleton loader si aucune question n'est disponible
  if (questions.length === 0) {
    return <RelatedQuestionsSkeleton />;
  }

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
                "border rounded-lg overflow-hidden",
                "border-primary/10 hover:border-primary/20 transition-all duration-300"
              )}
            >
              <button
                className={cn(
                  "w-full px-4 py-3 flex justify-between items-start text-left", 
                  "bg-card/90 backdrop-blur-sm hover:bg-card transition-all duration-300"
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
