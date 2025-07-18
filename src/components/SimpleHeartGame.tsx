import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface SimpleHeartGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
}

const SimpleHeartGame = ({ gifts, onComplete }: SimpleHeartGameProps) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameWon, setGameWon] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const heartIdRef = useRef(0);

  const TARGET_SCORE = 5;

  useEffect(() => {
    if (!gameActive) return;

    const gameInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          if (score >= TARGET_SCORE) {
            setGameWon(true);
            setTimeout(() => {
              const randomGiftIndex = Math.floor(Math.random() * gifts.length);
              onComplete(randomGiftIndex);
            }, 1500);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(gameInterval);
  }, [gameActive, score, gifts.length, onComplete]);

  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const newHeart: Heart = {
          id: heartIdRef.current++,
          x: Math.random() * (rect.width - 40),
          y: rect.height - 40,
          speed: 2 + Math.random() * 2,
        };
        setHearts(prev => [...prev, newHeart]);
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const moveInterval = setInterval(() => {
      setHearts(prev => 
        prev
          .map(heart => ({ ...heart, y: heart.y - heart.speed }))
          .filter(heart => heart.y > -40)
      );
    }, 16);

    return () => clearInterval(moveInterval);
  }, [gameActive]);

  const handleHeartClick = (heartId: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== heartId));
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(10);
    setGameWon(false);
    setHearts([]);
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(10);
    setGameWon(false);
    setHearts([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-lg animate-bounce opacity-30"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '4s',
            }}
          >
            💕
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto text-center space-y-8 z-10">
        <div className="space-y-4 fade-in-minimal">
          <div className="text-6xl gentle-float">❤️</div>
          <h2 className="text-3xl font-light text-foreground">
            Tap the Hearts!
          </h2>
          <p className="text-muted-foreground font-light">
            Tap {TARGET_SCORE} hearts in 10 seconds to win your gift!
          </p>
        </div>

        <Card className="minimal-card bg-gradient-to-br from-card to-accent/10 border-accent/20">
          <CardContent className="p-6">
            {!gameActive && !gameWon && score === 0 && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Ready to catch some floating hearts?
                </p>
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  Start Game ❤️
                </Button>
              </div>
            )}

            {gameActive && (
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Score: {score}/{TARGET_SCORE}</span>
                  <span>Time: {timeLeft}s</span>
                </div>
                
                {/* Game Area */}
                <div 
                  ref={gameAreaRef}
                  className="relative w-full h-64 bg-gradient-to-t from-accent/5 to-transparent rounded-lg border-2 border-accent/20 overflow-hidden"
                >
                  {hearts.map(heart => (
                    <button
                      key={heart.id}
                      onClick={() => handleHeartClick(heart.id)}
                      className="absolute text-3xl hover:scale-125 transition-transform duration-100 cursor-pointer z-10"
                      style={{
                        left: `${heart.x}px`,
                        bottom: `${heart.y}px`,
                      }}
                    >
                      ❤️
                    </button>
                  ))}
                  
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm pointer-events-none">
                    Tap the floating hearts!
                  </div>
                </div>
              </div>
            )}

            {!gameActive && score > 0 && !gameWon && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {score >= TARGET_SCORE ? "Time's up! But you got enough hearts!" : `You got ${score} hearts! Need ${TARGET_SCORE} to win.`}
                </p>
                <Button 
                  onClick={score >= TARGET_SCORE ? () => {
                    setGameWon(true);
                    setTimeout(() => {
                      const randomGiftIndex = Math.floor(Math.random() * gifts.length);
                      onComplete(randomGiftIndex);
                    }, 1500);
                  } : resetGame}
                  className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  {score >= TARGET_SCORE ? "Claim Gift! 🎁" : "Try Again"}
                </Button>
              </div>
            )}

            {gameWon && (
              <div className="space-y-3 scale-in-minimal">
                <div className="text-4xl">🎉</div>
                <p className="text-primary font-medium text-lg">
                  Amazing! You caught {score} hearts!
                </p>
                <p className="text-muted-foreground">
                  Unlocking your gift...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleHeartGame;