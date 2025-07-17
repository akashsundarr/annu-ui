
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface QuizGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizGame = ({ gifts, onComplete }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const questions: QuizQuestion[] = [
    {
      question: "What was our first movie date?",
      options: ["Spiderman", "Avengers", "Wonder Woman", "Batman"],
      correctAnswer: 0
    },
    {
      question: "What's your favorite sweet treat?",
      options: ["Ice cream", "Chocolate", "Cookies", "Cake"],
      correctAnswer: 1
    },
    {
      question: "What do you love to do most?",
      options: ["Dancing", "Singing", "Drawing", "Reading"],
      correctAnswer: 2
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz completed
        setTimeout(() => {
          const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
          setWonGift(randomGift);
          setShowWin(true);
        }, 1000);
      }
    }, 1500);
  };

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Love Quiz 💕
        </h1>
        <p className="text-muted-foreground font-light">
          Answer questions about our beautiful moments!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {!showWin && (
        <Card className="w-full max-w-md minimal-card">
          <CardContent className="p-8">
            <h2 className="text-xl font-medium text-foreground mb-6 text-center">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  variant="outline"
                  className={`
                    w-full py-3 text-left justify-start transition-all duration-200
                    ${showResult && selectedAnswer === index
                      ? index === currentQ.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-red-100 border-red-500 text-red-700'
                      : showResult && index === currentQ.correctAnswer
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {selectedAnswer === currentQ.correctAnswer 
                    ? "Correct! 🎉" 
                    : "Not quite, but that's okay! 💕"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Win Popup */}
      {showWin && wonGift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 scale-in-minimal">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-blue-400 text-lg animate-bounce"
                  style={{
                    left: `${15 + (i * 7)}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                >
                  💕
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Quiz Complete! 🎉
            </h2>
            <p className="text-muted-foreground mb-2">
              You scored {score} out of {questions.length}!
            </p>
            <p className="text-muted-foreground mb-6">
              You won: {wonGift.name}
            </p>
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-2 rounded-full font-medium"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
