
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
    <div className="min-h-screen flex items-center justify-center p-8 bg-background font-['Inter']">
      <div className="w-full max-w-xl text-center space-y-16">
        {/* Main Birthday Message */}
        <div className={`space-y-12 ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-semibold text-foreground">
              Happy Birthday
            </h1>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl md:text-4xl font-semibold text-accent-foreground">
                annuBee
              </h2>
              <Heart className="w-8 h-8 text-accent-foreground" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Heartfelt Message */}
        {showMessage && (
          <div className="fade-in-minimal">
            <Card className="minimal-card">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    You're the most precious part of my life
                  </p>
                  <p className="text-base text-muted-foreground">
                    Today is all about celebrating the amazing person you are
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gift Button */}
        {showButton && (
          <div className="fade-in-minimal">
            <Button
              onClick={() => navigate('/photo-gallery')}
              variant="secondary"
              className="px-8 py-3 text-lg font-medium"
            >
              <Gift className="mr-2 w-5 h-5" />
              Open Your First Gift
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWish;
