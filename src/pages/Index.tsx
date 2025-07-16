
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate('/birthday-wish');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className={`w-full max-w-lg ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
        <Card className="minimal-card p-8 text-center">
          <CardContent className="space-y-8 p-0">
            {/* Minimal Heart Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center gentle-float">
                <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h1 className="text-4xl font-light text-foreground tracking-tight">
                Hey Love
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                I made something special just for you
              </p>
              <p className="text-sm text-muted-foreground">
                A little digital surprise to celebrate your day
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                onClick={handleEnter}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              >
                Enter
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Signature */}
            <p className="text-xs text-muted-foreground/80 font-light">
              From akashee, with love
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
