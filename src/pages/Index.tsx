
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
    <div className="min-h-screen flex items-center justify-center p-8 bg-background font-['Inter']">
      <div className={`w-full max-w-md ${showContent ? 'fade-in-minimal' : 'opacity-0'}`}>
        <Card className="minimal-card p-12 text-center">
          <CardContent className="space-y-12 p-0">
            {/* Clean icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded bg-accent flex items-center justify-center">
                <Heart className="w-8 h-8 text-accent-foreground" fill="currentColor" />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-8">
              <h1 className="text-4xl font-semibold text-foreground">
                Hey Love
              </h1>
              <p className="text-lg text-muted-foreground">
                I made something special just for you
              </p>
              <p className="text-sm text-muted-foreground">
                A digital surprise to celebrate your special day
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                onClick={handleBeginSurprise}
                variant="secondary"
                className="w-full py-3 text-base font-medium"
              >
                Begin the Surprise
              </Button>
            </div>

            {/* Simple signature */}
            <p className="text-xs text-muted-foreground">
              With all my love, akashee
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
