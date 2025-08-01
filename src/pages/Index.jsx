import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
      <div className={`w-full max-w-md mx-auto ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
        <div className="minimal-card p-8 md:p-12 text-center space-y-8">
          {/* Clean icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-primary">
              Hey Love
            </h1>
            <p className="text-lg text-foreground leading-relaxed">
              I made something special just for you
            </p>
            <p className="text-sm text-muted-foreground">
              A digital surprise to celebrate your special day
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={handleBeginSurprise}
              className="w-full py-3 text-base font-medium"
              size="lg"
            >
              Begin the Surprise
            </Button>
          </div>

          {/* Simple signature */}
          <p className="text-xs text-muted-foreground pt-2">
            With all my love, akashee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;