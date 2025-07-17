
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SpinWheel from '@/components/SpinWheel';
import MemoryGallery from '@/components/MemoryGallery';

const GiftBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const navigate = useNavigate();

  const openGiftBox = () => {
    setIsOpen(true);
    setTimeout(() => setShowContents(true), 600);
  };

  const proceedToSpinWheel = () => {
    setShowSpinWheel(true);
  };

  // Show Spin Wheel if requested
  if (showSpinWheel) {
    return (
      <div>
        <SpinWheel />
        <MemoryGallery />
        
        {/* Navigation to next section */}
        <div className="text-center py-8 bg-gradient-to-br from-pink-50 to-yellow-50">
          <Button
            onClick={() => navigate('/heart-game')}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Continue to Heart Game
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-minimal">
          <h1 className="text-3xl font-light text-foreground mb-4">Your Special Gift Box</h1>
          <p className="text-muted-foreground font-light">Click the box to reveal your surprises</p>
        </div>

        {/* Gift Box */}
        {!isOpen ? (
          <div className="text-center scale-in-minimal">
            <Card 
              className="minimal-card w-48 h-48 mx-auto cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={openGiftBox}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-light">Click to open</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          showContents && (
            <div className="space-y-6 fade-in-minimal">
              {/* Love Letter */}
              <Card className="minimal-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                    <h3 className="text-lg font-medium text-foreground">A Love Letter</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed font-light italic">
                      "My dearest annuBee, you are the sunshine in my darkest days, 
                      the melody in my silence, and the reason I believe in forever. 
                      Every moment with you feels like a beautiful dream I never want to wake up from. 
                      Happy Birthday to the love of my life!"
                    </p>
                    <p className="text-right text-primary font-medium text-sm">
                      - With all my love, akashee
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Coupon */}
              <Card className="minimal-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-foreground">Special Coupon</h3>
                  </div>
                  <Card className="bg-accent/30 border-2 border-dashed border-accent">
                    <CardContent className="p-4 text-center">
                      <p className="text-base font-medium text-foreground mb-2">
                        🎫 One Surprise Date 🎫
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Just say when, and I'll plan the perfect day for us!"
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        *Valid forever, no expiration date
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Rose */}
              <div className="text-center">
                <div className="text-4xl gentle-float">🌹</div>
              </div>
            </div>
          )
        )}

        {/* Navigation Buttons */}
        {showContents && (
          <div className="text-center mt-8 space-y-4 scale-in-minimal">
            <Button
              onClick={proceedToSpinWheel}
              className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg mb-4 w-full"
            >
              Play Spin the Wheel Game 🎡
            </Button>
            <Button
              onClick={() => navigate('/heart-game')}
              variant="outline"
              className="px-8 py-3 font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 w-full"
            >
              Skip to Heart Game
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftBox;
