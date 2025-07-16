
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeartGame = () => {
  const navigate = useNavigate();
  const [clickedHearts, setClickedHearts] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [allRevealed, setAllRevealed] = useState(false);

  const loveReasons = [
    "I love the way you say my name 💕",
    "You make my world better every day ✨",
    "Your laugh is my favorite sound 😊",
    "You understand me like no one else 💖",
    "Your kindness touches everyone around you 🌟",
    "You make ordinary moments magical ✨",
    "Your hugs feel like home 🏡",
    "You believe in me when I don't believe in myself 💪",
    "Your smile brightens my darkest days ☀️",
    "You love me exactly as I am 💯"
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

  const handleHeartClick = (index: number) => {
    if (clickedHearts.includes(index)) return;
    
    setClickedHearts(prev => [...prev, index]);
    setCurrentMessage(loveReasons[index]);
    
    if (clickedHearts.length + 1 === loveReasons.length) {
      setTimeout(() => setAllRevealed(true), 1000);
    }
  };

  const resetGame = () => {
    setClickedHearts([]);
    setCurrentMessage('');
    setAllRevealed(false);
  };

  return (
    <div className="min-h-screen py-12 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-red-200"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 fade-in-up">
            Click the Hearts Game
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Find and click all the floating hearts to discover why I love you! 💖
          </p>
          <div className="text-pink-600 font-medium">
            Hearts Found: {clickedHearts.length} / {loveReasons.length}
          </div>
        </div>

        {/* Game Area */}
        <div className="relative h-96 md:h-[500px] mb-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl border-2 border-pink-200 overflow-hidden">
          {heartPositions.map((position, index) => (
            <Heart
              key={index}
              onClick={() => handleHeartClick(index)}
              className={`absolute cursor-pointer transition-all duration-300 transform ${
                clickedHearts.includes(index)
                  ? 'text-red-500 scale-125 opacity-50'
                  : 'text-pink-400 hover:text-red-500 hover:scale-110 heart-float'
              }`}
              style={{
                top: position.top,
                left: position.left,
                animationDelay: `${index * 0.2}s`,
              }}
              size={32}
            />
          ))}
          
          {/* Floating instruction */}
          {clickedHearts.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-pink-600 font-medium text-lg animate-pulse">
                Click the hearts to reveal messages! 💕
              </p>
            </div>
          )}
        </div>

        {/* Current Message Display */}
        {currentMessage && (
          <Card className="border-2 border-pink-200 glow-pink mb-8 bounce-in">
            <CardContent className="p-6 text-center">
              <p className="text-xl text-gray-700 font-medium">
                {currentMessage}
              </p>
            </CardContent>
          </Card>
        )}

        {/* All Hearts Found Celebration */}
        {allRevealed && (
          <div className="text-center space-y-6 fade-in-up">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              You found all the reasons I love you!
            </h2>
            <p className="text-xl text-gray-700 italic">
              "And these are just the beginning... I love you more every day! 💕"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={resetGame}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-6 py-3"
          >
            <RotateCcw className="mr-2" size={18} />
            Play Again
          </Button>
          
          <Button
            onClick={() => navigate('/timeline')}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full glow-pink transition-all duration-300 transform hover:scale-105"
          >
            Our Love Timeline
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeartGame;
