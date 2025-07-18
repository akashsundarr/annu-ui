
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BirthdayWish = () => {
  const [showContent, setShowContent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowMessage(true), 1500);
    const timer3 = setTimeout(() => setShowButton(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-accent rounded-full gentle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: '5s',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl text-center space-y-12 z-10">
        {/* Main Birthday Message */}
        <div className={`space-y-8 ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-extralight text-foreground tracking-tight">
              Happy Birthday
            </h1>
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-4xl md:text-6xl font-light text-primary">
                annuBee
              </h2>
              <Heart className="w-12 h-12 text-accent gentle-float" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Heartfelt Message */}
        {showMessage && (
          <div className="scale-in-minimal">
            <Card className="minimal-card bg-gradient-to-br from-card to-accent/10 border-accent/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed italic">
                    You're the most precious part of my life
                  </p>
                  <p className="text-lg text-muted-foreground/80 font-light">
                    Today is all about celebrating the amazing person you are
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gift Button */}
        {showButton && (
          <div className="scale-in-minimal">
            <Button
              onClick={() => navigate('/photo-gallery')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 text-xl font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg border-0"
            >
              <Gift className="mr-3 w-6 h-6" />
              Open Your First Gift
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWish;
