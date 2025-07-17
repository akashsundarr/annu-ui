
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SpinWheelGame from '@/components/SpinWheelGame';
import MemoryCardGame from '@/components/MemoryCardGame';
import BalloonPopGame from '@/components/BalloonPopGame';

type GameStep = 'start' | 'spin-wheel' | 'gift-card-1' | 'memory-game' | 'gift-card-2' | 'balloon-game' | 'gift-card-3' | 'final';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

const GiftBox = () => {
  const [currentStep, setCurrentStep] = useState<GameStep>('start');
  const [wonGifts, setWonGifts] = useState<Gift[]>([]);
  const navigate = useNavigate();

  const gifts: Gift[] = [
    { name: 'Chocolate', icon: '🍫', caption: 'Sweet treats for my sweet love 💝' },
    { name: 'Lipstick', icon: '💄', caption: 'To make your beautiful smile even brighter 💝' },
    { name: 'Spiderman', icon: '🕷️', caption: 'Your favorite superhero adventure 💝' },
    { name: 'Ring', icon: '💍', caption: 'A symbol of our endless bond 💝' },
    { name: 'Drawing Book', icon: '📓', caption: 'For your creative masterpieces 💝' },
    { name: 'Pencil', icon: '✏️', caption: 'To write our love story 💝' },
  ];

  const handleGameComplete = (giftIndex: number) => {
    const gift = gifts[giftIndex];
    setWonGifts(prev => [...prev, gift]);
    
    // Determine next step based on current step
    if (currentStep === 'spin-wheel') {
      setCurrentStep('gift-card-1');
    } else if (currentStep === 'memory-game') {
      setCurrentStep('gift-card-2');
    } else if (currentStep === 'balloon-game') {
      setCurrentStep('gift-card-3');
    }
  };

  const handleNextGame = () => {
    if (currentStep === 'gift-card-1') {
      setCurrentStep('memory-game');
    } else if (currentStep === 'gift-card-2') {
      setCurrentStep('balloon-game');
    } else if (currentStep === 'gift-card-3') {
      setCurrentStep('final');
    }
  };

  // Floating hearts background
  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
  );

  // Start Screen
  if (currentStep === 'start') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <div className="space-y-4 fade-in-minimal">
            <h1 className="text-4xl font-light text-foreground mb-4">
              Welcome to Your Surprise Gift Hunt 💛
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Play small games to win all your hidden gifts!
            </p>
          </div>
          
          <div className="scale-in-minimal">
            <Button
              onClick={() => setCurrentStep('spin-wheel')}
              className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Start the Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Gift Card Display
  if (currentStep.startsWith('gift-card')) {
    const latestGift = wonGifts[wonGifts.length - 1];
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <Card className="minimal-card scale-in-minimal">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4 gentle-float">
                {latestGift?.icon}
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-3">
                {latestGift?.name}
              </h3>
              <p className="text-muted-foreground font-light italic">
                {latestGift?.caption}
              </p>
            </CardContent>
          </Card>
          
          <Button
            onClick={handleNextGame}
            className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {currentStep === 'gift-card-3' ? 'Finish Game' : 'Play Next Game'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Final Screen
  if (currentStep === 'final') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-2xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s',
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <div className="space-y-6 fade-in-minimal">
            <div className="text-6xl gentle-float">🎉</div>
            <h1 className="text-3xl font-light text-foreground">
              You've unlocked all gifts! 💌
            </h1>
            <p className="text-muted-foreground font-light">
              Amazing job completing all the games!
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/photo-gallery')}
            className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Open Gallery of Memories
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Game Components
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingHearts />
      {currentStep === 'spin-wheel' && (
        <SpinWheelGame gifts={gifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'memory-game' && (
        <MemoryCardGame gifts={gifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'balloon-game' && (
        <BalloonPopGame gifts={gifts} onComplete={handleGameComplete} />
      )}
    </div>
  );
};

export default GiftBox;
