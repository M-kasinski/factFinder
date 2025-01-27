import { HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RelatedQuestionsProps {
  questions: string[];
  isVisible: boolean;
  onQuestionClick: (question: string) => void;
}

export function RelatedQuestions({ questions, isVisible, onQuestionClick }: RelatedQuestionsProps) {
  if (!isVisible || !questions.length) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Questions liées</h2>
      </div>

      <div className="grid gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full h-auto p-0 hover:no-underline"
            onClick={() => onQuestionClick(question)}
          >
            <Card className="w-full hover:bg-accent/50 transition-colors">
              <CardContent className="p-3">
                <p className="text-sm text-left">{question}</p>
              </CardContent>
            </Card>
          </Button>
        ))}
      </div>
    </div>
  );
} 
