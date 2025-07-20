
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

  // Gift progress indicator
  const GiftProgress = () => (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2 border border-border">
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
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="space-y-6 fade-in-minimal">
            <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-primary mb-4">
              Your Gift Adventure Begins
            </h1>
            <p className="text-lg text-foreground leading-relaxed">
              Play 6 magical games to unlock all your special gifts
            </p>
            
            {/* Gift Preview - Keep emojis for gift icons in games */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {availableGifts.map((gift, index) => (
                <div key={index} className="text-center p-3 minimal-card" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-2xl mb-1">{gift.icon}</div>
                  <div className="text-xs text-muted-foreground">{gift.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="fade-in-minimal">
            <Button
              onClick={() => setCurrentStep('spin-wheel')}
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
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
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
        <GiftProgress />
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="minimal-card p-8 text-center">
            <div className="text-6xl mb-6">
              {latestGift?.icon}
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              {latestGift?.name}
            </h3>
            <p className="text-foreground leading-relaxed">
              {latestGift?.caption}
            </p>
          </div>
          
          <Button
            onClick={handleNextGame}
            size="lg"
            className="px-8 py-3 font-medium"
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
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="space-y-6 fade-in-minimal">
            <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-primary">
              All Gifts Unlocked
            </h1>
            <p className="text-lg text-foreground">
              Amazing job completing all the games
            </p>
            
            {/* All Gifts Display - Keep emojis for gift reveals */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {wonGifts.map((gift, index) => (
                <div key={index} className="text-center p-4 minimal-card">
                  <div className="text-3xl mb-2">{gift.icon}</div>
                  <div className="text-sm text-muted-foreground">{gift.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/timeline')}
            size="lg"
            className="px-8 py-3 font-medium"
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
    <div className="min-h-screen bg-background">
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
