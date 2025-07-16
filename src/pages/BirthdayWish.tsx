
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BirthdayWish = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTypewriter(true), 1000);
    const timer2 = setTimeout(() => setShowButton(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded floating-hearts"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-pink-300 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
            size={20}
          />
        ))}
      </div>

      <div className="text-center space-y-12 max-w-4xl mx-auto px-6">
        {/* Main Birthday Message */}
        <div className="space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bounce-in">
            Happy Birthday
          </h1>
          
          <div className="text-5xl md:text-6xl font-bold text-red-500 bounce-in flex items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
            annuBee
            <Heart className="text-pink-500 heart-float" size={48} />
          </div>
        </div>

        {/* Typewriter Message */}
        <div className="pt-8">
          {showTypewriter && (
            <p className="text-2xl md:text-3xl text-gray-700 typewriter font-medium">
              You're the most precious part of my life.
            </p>
          )}
        </div>

        {/* Navigation Button */}
        {showButton && (
          <div className="pt-12 fade-in-up">
            <Button
              onClick={() => navigate('/photo-gallery')}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-10 py-4 text-lg rounded-full glow-pink transition-all duration-300 transform hover:scale-105"
            >
              Let's explore our memories
              <ArrowRight className="ml-3" size={20} />
            </Button>
          </div>
        )}

        {/* Hearts decoration */}
        <div className="absolute top-20 left-20 text-pink-400 heart-float">
          <Heart size={40} />
        </div>
        <div className="absolute bottom-20 right-20 text-red-400 heart-float" style={{ animationDelay: '1s' }}>
          <Heart size={35} />
        </div>
      </div>
    </div>
  );
};

export default BirthdayWish;
