
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBeginSurprise = () => {
    navigate('/birthday-wish');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full gentle-float"
            style={{
              left: `${15 + (i * 20)}%`,
              top: `${25 + (i % 2) * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: '6s',
            }}
          />
        ))}
      </div>

      <div className={`w-full max-w-lg ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
        <Card className="minimal-card p-8 text-center">
          <CardContent className="space-y-8 p-0">
            {/* Clean icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center gentle-float">
                <Heart className="w-10 h-10 text-primary" fill="currentColor" />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-6">
              <h1 className="text-5xl font-light text-foreground tracking-tight flex items-center justify-center gap-3">
                Hey Love
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                I made something special just for you
              </p>
              <p className="text-sm text-muted-foreground opacity-80">
                A magical digital surprise to celebrate your special day
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                onClick={handleBeginSurprise}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-4 text-lg rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg border-0"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Begin the Surprise
              </Button>
            </div>

            {/* Simple signature */}
            <p className="text-xs text-muted-foreground/80 font-light pt-4">
              With all my love, akashee
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
