
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Trophy, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SpinWheelGame from '@/components/SpinWheelGame';
import MemoryCardGame from '@/components/MemoryCardGame';
import BalloonPopGame from '@/components/BalloonPopGame';
import WordScrambleGame from '@/components/WordScrambleGame';
import SimpleHeartGame from '@/components/SimpleHeartGame';
import QuizGame from '@/components/QuizGame';

type GameStep = 'start' | 'spin-wheel' | 'gift-card-1' | 'memory-game' | 'gift-card-2' | 'balloon-game' | 'gift-card-3' | 'word-scramble' | 'gift-card-4' | 'heart-game' | 'gift-card-5' | 'quiz-game' | 'gift-card-6' | 'final';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

const GiftBox = () => {
  const [currentStep, setCurrentStep] = useState<GameStep>('start');
  const [wonGifts, setWonGifts] = useState<Gift[]>([]);
  const [availableGifts, setAvailableGifts] = useState<Gift[]>([
    { name: 'Chocolate', icon: '🍫', caption: 'Sweet treats for my sweet love 💝' },
    { name: 'Lipstick', icon: '💄', caption: 'To make your beautiful smile even brighter 💝' },
    { name: 'Spiderman', icon: '🕷️', caption: 'Your favorite superhero adventure 💝' },
    { name: 'Ring', icon: '💍', caption: 'A symbol of our endless bond 💝' },
    { name: 'Drawing Book', icon: '📓', caption: 'For your creative masterpieces 💝' },
    { name: 'Pencil', icon: '✏️', caption: 'To write our love story together 💝' },
  ]);
  const navigate = useNavigate();

  // Floating hearts background component
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

  // Gift progress indicator
  const GiftProgress = () => (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        <Trophy className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          {wonGifts.length}/6 Gifts Unlocked
        </span>
      </div>
    </div>
  );

  const handleGameComplete = (giftIndex: number) => {
    const gift = availableGifts[giftIndex];
    setWonGifts(prev => [...prev, gift]);
    setAvailableGifts(prev => prev.filter((_, index) => index !== giftIndex));
    
    // Navigate to gift card display
    if (currentStep === 'spin-wheel') {
      setCurrentStep('gift-card-1');
    } else if (currentStep === 'memory-game') {
      setCurrentStep('gift-card-2');
    } else if (currentStep === 'balloon-game') {
      setCurrentStep('gift-card-3');
    } else if (currentStep === 'word-scramble') {
      setCurrentStep('gift-card-4');
    } else if (currentStep === 'heart-game') {
      setCurrentStep('gift-card-5');
    } else if (currentStep === 'quiz-game') {
      setCurrentStep('gift-card-6');
    }
  };

  const handleNextGame = () => {
    if (currentStep === 'gift-card-1') {
      setCurrentStep('memory-game');
    } else if (currentStep === 'gift-card-2') {
      setCurrentStep('balloon-game');
    } else if (currentStep === 'gift-card-3') {
      setCurrentStep('word-scramble');
    } else if (currentStep === 'gift-card-4') {
      setCurrentStep('heart-game');
    } else if (currentStep === 'gift-card-5') {
      setCurrentStep('quiz-game');
    } else if (currentStep === 'gift-card-6') {
      setCurrentStep('final');
    }
  };

  // Start Screen
  if (currentStep === 'start') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <div className="space-y-6 fade-in-minimal">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center gentle-float">
              <Gift className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-light text-foreground mb-4">
              Your Gift Adventure Begins
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Play 6 magical games to unlock all your special gifts
            </p>
            
            {/* Gift Preview */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {availableGifts.map((gift, index) => (
                <div key={index} className="text-center p-3 bg-card rounded-lg border gentle-float" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-2xl mb-1">{gift.icon}</div>
                  <div className="text-xs text-muted-foreground">{gift.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="scale-in-minimal">
            <Button
              onClick={() => setCurrentStep('spin-wheel')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg border-0"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Start Playing
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Gift Card Display
  if (currentStep.startsWith('gift-card')) {
    const latestGift = wonGifts[wonGifts.length - 1];
    const isLastGift = currentStep === 'gift-card-6';
    
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        <GiftProgress />
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <Card className="minimal-card scale-in-minimal bg-gradient-to-br from-card to-accent/10 border-accent/20">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-6 gentle-float">
                {latestGift?.icon}
              </div>
              <h3 className="text-3xl font-medium text-foreground mb-4">
                {latestGift?.name}
              </h3>
              <p className="text-muted-foreground font-light italic text-lg leading-relaxed">
                {latestGift?.caption}
              </p>
            </CardContent>
          </Card>
          
          <Button
            onClick={handleNextGame}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg border-0"
          >
            {isLastGift ? 'See All Gifts' : 'Next Game'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Final Screen - All gifts collected
  if (currentStep === 'final') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background relative">
        <FloatingHearts />
        {/* Subtle celebration particles */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>
        
        <div className="max-w-md mx-auto text-center space-y-8 z-10">
          <div className="space-y-6 fade-in-minimal">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center gentle-float">
              <Gift className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-light text-foreground">
              All Gifts Unlocked
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Amazing job completing all the games
            </p>
            
            {/* All Gifts Display */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {wonGifts.map((gift, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-card to-accent/10 rounded-lg border-accent/20 border gentle-float" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-3xl mb-2">{gift.icon}</div>
                  <div className="text-sm text-muted-foreground">{gift.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/timeline')}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg border-0"
          >
            Create Our Timeline
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
      <GiftProgress />
      {currentStep === 'spin-wheel' && (
        <SpinWheelGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'memory-game' && (
        <MemoryCardGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'balloon-game' && (
        <BalloonPopGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'word-scramble' && (
        <WordScrambleGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'heart-game' && (
        <SimpleHeartGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
      {currentStep === 'quiz-game' && (
        <QuizGame gifts={availableGifts} onComplete={handleGameComplete} />
      )}
    </div>
  );
};

export default GiftBox;
