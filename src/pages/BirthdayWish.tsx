
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BirthdayWish = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => setShowButton(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl text-center space-y-12">
        {/* Main Birthday Message */}
        <div className={`space-y-8 ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-extralight text-foreground tracking-tight">
              Happy Birthday
            </h1>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl md:text-5xl font-light text-primary">
                annuBee
              </h2>
              <Heart className="w-8 h-8 text-accent gentle-float" fill="currentColor" />
            </div>
          </div>
          
          <Card className="minimal-card">
            <CardContent className="p-8">
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                You're the most precious part of my life
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Button */}
        {showButton && (
          <div className="scale-in-minimal">
            <Button
              onClick={() => navigate('/photo-gallery')}
              variant="outline"
              className="px-8 py-3 text-base font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Our memories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayWish;
