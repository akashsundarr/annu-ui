
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const navigate = useNavigate();

  const openGiftBox = () => {
    setIsOpen(true);
    setTimeout(() => setShowContents(true), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 relative overflow-hidden">
      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-pink-300 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
            size={18}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 fade-in-up">
            Your Special Gift Box
          </h1>
          <p className="text-lg text-gray-600">
            Click the box to reveal your surprises! 💝
          </p>
        </div>

        {/* Gift Box */}
        {!isOpen ? (
          <div className="mb-8 bounce-in">
            <div
              onClick={openGiftBox}
              className="cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative mx-auto w-48 h-48 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl glow-pink">
                <div className="absolute inset-4 bg-gradient-to-br from-pink-300 to-red-400 rounded-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Gift className="text-white" size={64} />
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-yellow-400 rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
            <p className="mt-6 text-pink-600 font-medium">Click to open! ✨</p>
          </div>
        ) : (
          showContents && (
            <div className="space-y-6 fade-in-up">
              {/* Love Letter */}
              <Card className="border-2 border-pink-200 glow-pink">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="text-red-500" size={24} />
                    <h3 className="text-xl font-bold text-pink-600">A Love Letter</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "My dearest annuBee, you are the sunshine in my darkest days, 
                    the melody in my silence, and the reason I believe in forever. 
                    Every moment with you feels like a beautiful dream I never want to wake up from. 
                    Happy Birthday to the love of my life! 💕"
                  </p>
                  <p className="mt-4 text-right text-pink-600 font-medium">
                    - With all my love, akashee ❤️
                  </p>
                </CardContent>
              </Card>

              {/* Coupon */}
              <Card className="border-2 border-red-200 glow-red">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-pink-500" size={24} />
                    <h3 className="text-xl font-bold text-red-600">Special Coupon</h3>
                  </div>
                  <div className="bg-gradient-to-r from-pink-100 to-red-100 p-4 rounded-lg border-2 border-dashed border-pink-300">
                    <p className="text-lg font-bold text-center text-pink-700">
                      🎫 One Surprise Date 🎫
                    </p>
                    <p className="text-center text-gray-600 mt-2">
                      "Just say when, and I'll plan the perfect day for us!"
                    </p>
                    <p className="text-xs text-center text-pink-500 mt-2">
                      *Valid forever, no expiration date ♾️
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Rose Animation */}
              <div className="flex justify-center">
                <div className="text-6xl heart-float">🌹</div>
              </div>
            </div>
          )
        )}

        {/* Navigation Button */}
        {showContents && (
          <div className="mt-12 fade-in-up" style={{ animationDelay: '1s' }}>
            <Button
              onClick={() => navigate('/heart-game')}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg rounded-full glow-pink transition-all duration-300 transform hover:scale-105"
            >
              Play the Heart Game 💖
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftBox;
