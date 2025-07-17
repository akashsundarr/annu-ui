
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface WordScrambleGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface WordPuzzle {
  word: string;
  scrambled: string;
  hint: string;
}

const WordScrambleGame = ({ gifts, onComplete }: WordScrambleGameProps) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const wordPuzzles: WordPuzzle[] = [
    {
      word: 'LOVE',
      scrambled: 'VOLE',
      hint: 'A feeling of deep affection 💕'
    },
    {
      word: 'HEART',
      scrambled: 'EARTH',
      hint: 'The organ that symbolizes love ❤️'
    },
    {
      word: 'KISS',
      scrambled: 'SISK',
      hint: 'A romantic gesture with lips 💋'
    },
    {
      word: 'SWEET',
      scrambled: 'WEETS',
      hint: 'Something that tastes like sugar 🍯'
    }
  ];

  const currentPuzzle = wordPuzzles[currentWord];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userAnswer.toUpperCase() === currentPuzzle.word) {
      // Correct answer
      if (currentWord + 1 < wordPuzzles.length) {
        // Move to next word
        setCurrentWord(prev => prev + 1);
        setUserAnswer('');
        setShowHint(false);
        setAttempts(0);
      } else {
        // All words completed
        setTimeout(() => {
          const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
          setWonGift(randomGift);
          setShowWin(true);
        }, 500);
      }
    } else {
      // Wrong answer
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
      setUserAnswer('');
    }
  };

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Floating letters background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-2xl animate-bounce opacity-30"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '3s',
            }}
          >
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][i]}
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal z-10">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Word Scramble 🔤
        </h1>
        <p className="text-muted-foreground font-light">
          Unscramble the love-themed words!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Word {currentWord + 1} of {wordPuzzles.length}
        </p>
      </div>

      {!showWin && (
        <Card className="w-full max-w-md minimal-card z-10">
          <CardContent className="p-8">
            {/* Scrambled Word Display */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-foreground mb-4 tracking-wider">
                {currentPuzzle.scrambled}
              </div>
              <p className="text-muted-foreground text-sm">
                Unscramble these letters to make a word
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="text-center text-lg font-medium"
                autoFocus
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground"
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </Button>
            </form>

            {/* Hint */}
            {showHint && (
              <div className="mt-6 p-4 bg-muted rounded-lg text-center animate-fade-in">
                <p className="text-sm text-muted-foreground mb-2">💡 Hint:</p>
                <p className="text-foreground">{currentPuzzle.hint}</p>
              </div>
            )}

            {/* Attempts */}
            {attempts > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {attempts === 1 ? "Try again! Hint will appear after next attempt." : "Keep trying! 💪"}
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
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-pink-400 text-lg animate-bounce"
                  style={{
                    left: `${10 + (i * 6)}%`,
                    top: `${10 + (i % 4) * 22}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.2s',
                  }}
                >
                  🔤
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Words Unscrambled! 🎉
            </h2>
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

export default WordScrambleGame;
