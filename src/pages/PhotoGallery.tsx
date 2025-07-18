
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
      caption: "Our first date - when I knew you were special",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      caption: "Your smile here melted my heart",
    },
    {
      src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800",
      caption: "That perfect sunset moment with you",
    },
    {
      src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800",
      caption: "When we laughed until our stomachs hurt",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      caption: "Dancing like nobody's watching",
    },
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
      caption: "Our silly moments together",
    },
  ];

  const handleArrowClick = () => {
    if (isAnimating) return;
    
    setShowSplash(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowSplash(false);
      setCurrentImageIndex((prev) => (prev + 1) % photos.length);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 600);
  };

  const currentPhoto = photos[currentImageIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center fade-in-minimal">
        <div className="inline-flex items-center gap-2 mb-2">
          <Camera className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-light text-foreground">Our Beautiful Memories</h1>
        </div>
        <p className="text-sm text-muted-foreground font-light">Swipe through our precious moments</p>
      </div>

      {/* Main Photo Container */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Photo Card */}
        <div 
          className={`relative bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
            isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'
          }`}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              key={currentImageIndex}
              src={currentPhoto.src}
              alt={`Memory ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isAnimating ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Arrow Button */}
            <button
              onClick={handleArrowClick}
              disabled={isAnimating}
              className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm 
                         flex items-center justify-center transition-all duration-200 hover:scale-110 
                         hover:bg-white shadow-lg ${isAnimating ? 'pointer-events-none' : ''}`}
            >
              <ArrowRight 
                className={`w-6 h-6 text-primary transition-all duration-200 ${
                  isAnimating ? 'scale-125' : 'scale-100'
                }`} 
              />
            </button>

            {/* Arrow Splash Animation */}
            {showSplash && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="heart-splash">
                  <ArrowRight className="w-16 h-16 text-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="p-6 text-center">
            <p 
              key={`caption-${currentImageIndex}`}
              className="text-lg text-muted-foreground font-light italic animate-fade-in"
            >
              {currentPhoto.caption}
            </p>
          </div>
        </div>

        {/* Image Counter */}
        <div className="flex justify-center mt-6 space-x-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={() => navigate('/gift-box')}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-10 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105 shadow-lg border-0"
        >
          <Gamepad2 className="mr-3 w-5 h-5" />
          Let's Play Games
        </Button>
      </div>
    </div>
  );
};

export default PhotoGallery;
