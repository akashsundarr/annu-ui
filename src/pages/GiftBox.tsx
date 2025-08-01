import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GiftItem {
  name: string;
  icon: string;
  caption: string;
}

const GiftBox = () => {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [viewAllGifts, setViewAllGifts] = useState(false);
  const navigate = useNavigate();

  const gifts: GiftItem[] = [
    { name: 'Chocolate', icon: '🍫', caption: 'Sweet treats for my sweet love 💝' },
    { name: 'Lipstick', icon: '💄', caption: 'To make your beautiful smile even brighter 💝' },
    { name: 'Spiderman', icon: '🕷️', caption: 'Your favorite superhero adventure 💝' },
    { name: 'Ring', icon: '💍', caption: 'A symbol of our endless bond 💝' },
    { name: 'Drawing Book', icon: '📓', caption: 'For your creative masterpieces 💝' },
    { name: 'Pencil', icon: '✏️', caption: 'To write our love story together 💝' },
  ];

  // Individual Gift Display
  if (selectedGift) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="minimal-card p-8 text-center">
            <div className="text-6xl mb-6">
              {selectedGift.icon}
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              {selectedGift.name}
            </h3>
            <p className="text-foreground leading-relaxed">
              {selectedGift.caption}
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={() => setViewAllGifts(true)}
              size="lg"
              className="px-8 py-3 font-medium w-full"
            >
              View All Gifts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              onClick={() => setSelectedGift(null)}
              variant="outline"
              size="lg"
              className="px-8 py-3 font-medium w-full"
            >
              Back to Gifts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // All Gifts Display
  if (viewAllGifts) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="space-y-6 fade-in-minimal">
            <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-primary">
              Your Special Gifts
            </h1>
            <p className="text-lg text-foreground">
              All your beautiful gifts in one place
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {gifts.map((gift, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGift(gift)}
                  className="text-center p-4 minimal-card hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-3xl mb-2">{gift.icon}</div>
                  <div className="text-sm text-muted-foreground">{gift.name}</div>
                </button>
              ))}
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/timeline')}
            size="lg"
            className="px-8 py-3 font-medium"
          >
            Create Our Timeline
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Main Gift Selection Screen
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background font-['Inter']">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="space-y-6 fade-in-minimal">
          <div className="w-12 h-12 mx-auto bg-secondary rounded-xl flex items-center justify-center">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-primary mb-4">
            Your Special Gifts
          </h1>
          <p className="text-lg text-foreground leading-relaxed">
            Click on any gift to see what's waiting for you
          </p>
          
          <div className="grid grid-cols-3 gap-3 mt-6">
            {gifts.map((gift, index) => (
              <button
                key={index}
                onClick={() => setSelectedGift(gift)}
                className="text-center p-3 minimal-card hover:scale-105 transition-transform cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-2xl mb-1">{gift.icon}</div>
                <div className="text-xs text-muted-foreground">{gift.name}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="fade-in-minimal">
          <Button
            onClick={() => setViewAllGifts(true)}
            size="lg"
            className="px-8 py-3 text-lg font-medium"
          >
            View All Gifts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GiftBox;