
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400",
      caption: "Our first date - when I knew you were special",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
      caption: "Your smile here melted my heart",
    },
    {
      src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400",
      caption: "That perfect sunset moment with you",
    },
    {
      src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400",
      caption: "When we laughed until our stomachs hurt",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      caption: "Dancing like nobody's watching",
    },
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
      caption: "Our silly moments together",
    },
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-minimal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Camera className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-light text-foreground">Our Beautiful Memories</h1>
          </div>
          <p className="text-muted-foreground font-light">Each moment captured with love</p>
        </div>

        {/* Photo Display */}
        <Card className="minimal-card mb-8 scale-in-minimal">
          <CardContent className="p-6">
            <div className="relative">
              <img
                src={photos[currentPhoto].src}
                alt={`Memory ${currentPhoto + 1}`}
                className="w-full h-80 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-lg text-muted-foreground font-light italic">
                {photos[currentPhoto].caption}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <Button
            onClick={prevPhoto}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground font-medium min-w-[80px]">
            {currentPhoto + 1} of {photos.length}
          </span>
          
          <Button
            onClick={nextPhoto}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Photo Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                index === currentPhoto
                  ? 'ring-2 ring-primary scale-105'
                  : 'hover:scale-105 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={photo.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-16 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Navigation to Next Section */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/gift-box')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            Open your gift box
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
