import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
      <div className="w-full max-w-2xl mx-auto text-center space-y-12">
        {/* Main Birthday Message */}
        <div className={`space-y-8 ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold text-primary">
              Happy Birthday
            </h1>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                annuBee
              </h2>
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Heartfelt Message */}
        {showMessage && (
          <div className="fade-in-minimal">
            <div className="minimal-card p-8 space-y-6">
              <p className="text-xl text-foreground leading-relaxed">
                You're the most precious part of my life
              </p>
              <p className="text-base text-muted-foreground">
                Today is all about celebrating the amazing person you are
              </p>
            </div>
          </div>
        )}

        {/* Gift Button */}
        {showButton && (
          <div className="fade-in-minimal">
            <Button
              onClick={() => navigate('/timeline')}
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              <Gift className="mr-2 w-5 h-5" />
              Create Our Timeline
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWish;