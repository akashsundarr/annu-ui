import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeartGame = () => {
  const navigate = useNavigate();
  const [clickedHearts, setClickedHearts] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [allRevealed, setAllRevealed] = useState(false);

  const loveReasons = [
    "I love the way you say my name",
    "You make my world better every day",
    "Your laugh is my favorite sound",
    "You understand me like no one else",
    "Your kindness touches everyone around you",
    "You make ordinary moments magical",
    "Your hugs feel like home",
    "You believe in me when I don't believe in myself",
    "Your smile brightens my darkest days",
    "You love me exactly as I am"
  ];

  const heartPositions = [
    { top: '20%', left: '15%' },
    { top: '35%', left: '80%' },
    { top: '15%', left: '70%' },
    { top: '60%', left: '10%' },
    { top: '45%', left: '45%' },
    { top: '25%', left: '40%' },
    { top: '70%', left: '70%' },
    { top: '50%', left: '85%' },
    { top: '80%', left: '30%' },
    { top: '65%', left: '55%' }
  ];

  const handleHeartClick = (index) => {
    if (clickedHearts.includes(index)) return;
    
    setClickedHearts(prev => [...prev, index]);
    setCurrentMessage(loveReasons[index]);
    
    if (clickedHearts.length + 1 === loveReasons.length) {
      setTimeout(() => setAllRevealed(true), 800);
    }
  };

  const resetGame = () => {
    setClickedHearts([]);
    setCurrentMessage('');
    setAllRevealed(false);
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in-minimal">
          <h1 className="text-3xl font-light text-foreground mb-4">Click the Hearts Game</h1>
          <p className="text-muted-foreground font-light mb-4">
            Find and click all the floating hearts to discover why I love you
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
            <span className="text-sm text-muted-foreground font-medium">
              {clickedHearts.length} / {loveReasons.length}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <Card className="minimal-card mb-8 scale-in-minimal">
          <CardContent className="relative h-96 md:h-[500px] p-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-accent/20"></div>
            {heartPositions.map((position, index) => (
              <Heart
                key={index}
                onClick={() => handleHeartClick(index)}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  clickedHearts.includes(index)
                    ? 'text-primary scale-125 opacity-50'
                    : 'text-primary/60 hover:text-primary hover:scale-110 gentle-float'
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                  animationDelay: `${index * 0.2}s`,
                }}
                size={24}
                fill="currentColor"
              />
            ))}
            
            {/* Floating instruction */}
            {clickedHearts.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <p className="text-muted-foreground font-light text-center">
                      Click the hearts to reveal messages
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Message Display */}
        {currentMessage && (
          <Card className="minimal-card mb-8 scale-in-minimal">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-foreground font-light">
                {currentMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {/* All Hearts Found Celebration */}
        {allRevealed && (
          <div className="text-center space-y-6 fade-in-minimal">
            <div className="text-4xl mb-4">🎉</div>
            <Card className="minimal-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light text-foreground mb-4">
                  You found all the reasons I love you!
                </h2>
                <p className="text-lg text-muted-foreground font-light italic">
                  "And these are just the beginning... I love you more every day!"
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={resetGame}
            variant="outline"
            className="px-6 py-3 font-medium"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Play Again
          </Button>
          
          <Button
            onClick={() => navigate('/timeline')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            Our Love Timeline
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeartGame;