
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate('/birthday-wish');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300 floating-hearts opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${Math.random() * 20 + 15}px`,
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute text-pink-400 sparkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
            size={16}
          />
        ))}
      </div>

      <div className={`text-center space-y-8 max-w-2xl mx-auto px-6 ${showContent ? 'fade-in-up' : 'opacity-0'}`}>
        {/* Main Welcome Message */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 mb-4">
              Hey Love
            </h1>
            <Heart className="absolute -top-4 -right-8 text-red-400 heart-float" size={32} />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            I made something just for you...
          </p>
          
          <div className="text-lg text-pink-600 font-medium">
            A little digital surprise to celebrate your special day ✨
          </div>
        </div>

        {/* Enter Button */}
        <div className="pt-8">
          <Button
            onClick={handleEnter}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-12 py-6 text-xl rounded-full glow-pink transition-all duration-300 transform hover:scale-105 bounce-in"
            style={{ animationDelay: '1s' }}
          >
            <Gift className="mr-3" size={24} />
            Click to Enter
            <Heart className="ml-3" size={24} />
          </Button>
        </div>

        {/* Subtle hint */}
        <p className="text-sm text-gray-500 mt-8">
          From akashee, with all my love 💕
        </p>
      </div>
    </div>
  );
};

export default Index;
