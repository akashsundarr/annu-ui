
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface BalloonPopGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  hasGift: boolean;
  isPopped: boolean;
}

const BalloonPopGame = ({ gifts, onComplete }: BalloonPopGameProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const balloonColors = [
    'bg-pink-300',
    'bg-yellow-300', 
    'bg-blue-300',
    'bg-green-300',
    'bg-purple-300',
    'bg-orange-300'
  ];

  // Initialize balloons
  const initializeBalloons = () => {
    const newBalloons: Balloon[] = [];
    const giftBalloonIndex = Math.floor(Math.random() * 8);
    
    for (let i = 0; i < 8; i++) {
      newBalloons.push({
        id: i,
        x: 20 + (i % 4) * 20,
        y: 20 + Math.floor(i / 4) * 25,
        color: balloonColors[i % balloonColors.length],
        hasGift: i === giftBalloonIndex,
        isPopped: false,
      });
    }
    
    setBalloons(newBalloons);
    setGameStarted(true);
  };

  const handleBalloonPop = (id: number) => {
    const balloon = balloons.find(b => b.id === id);
    if (!balloon || balloon.isPopped) return;

    setBalloons(prev => prev.map(b => 
      b.id === id ? { ...b, isPopped: true } : b
    ));

    if (balloon.hasGift) {
      setTimeout(() => {
        const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
        setWonGift(randomGift);
        setShowWin(true);
      }, 500);
    }
  };

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-blue-50 to-pink-50">
      {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-4xl opacity-20 animate-pulse"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s',
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal z-10">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Balloon Pop 🎯
        </h1>
        <p className="text-muted-foreground font-light">
          Pop balloons to find your hidden gift!
        </p>
      </div>

      {!gameStarted ? (
        <Button
          onClick={initializeBalloons}
          className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg z-10"
        >
          Start Balloon Pop
        </Button>
      ) : (
        /* Balloons */
        <div className="relative w-full max-w-lg h-80 mx-auto z-10">
          {balloons.map((balloon) => (
            <button
              key={balloon.id}
              onClick={() => handleBalloonPop(balloon.id)}
              disabled={balloon.isPopped}
              className={`
                absolute w-16 h-20 rounded-full shadow-lg transition-all duration-300 
                hover:scale-110 transform-gpu
                ${balloon.isPopped ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                ${balloon.color}
              `}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                animation: balloon.isPopped ? 'none' : 'gentle-float 3s ease-in-out infinite',
                animationDelay: `${balloon.id * 0.2}s`,
              }}
            >
              <div className="relative">
                {/* Balloon string */}
                <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gray-400 transform -translate-x-0.5"></div>
                {/* Highlight */}
                <div className="absolute top-2 left-3 w-3 h-4 bg-white/30 rounded-full"></div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Win Popup */}
      {showWin && wonGift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 scale-in-minimal">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-400 text-lg animate-bounce"
                  style={{
                    left: `${10 + (i * 5)}%`,
                    top: `${10 + (i % 5) * 20}%`,
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: '1s',
                  }}
                >
                  🎊
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Balloon Popped! 🎈
            </h2>
            <p className="text-muted-foreground mb-6">
              You found: {wonGift.name}
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

export default BalloonPopGame;
