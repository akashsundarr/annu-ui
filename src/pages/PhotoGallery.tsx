
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    {
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400",
      caption: "Our first date - when I knew you were special ✨",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
      caption: "Your smile here melted my heart 💕",
    },
    {
      src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400",
      caption: "That perfect sunset moment with you 🌅",
    },
    {
      src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400",
      caption: "When we laughed until our stomachs hurt 😂",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      caption: "Dancing like nobody's watching 💃",
    },
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
      caption: "Our silly moments together 🤪",
    },
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen py-12 px-6 relative overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 heart-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
            size={24}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 fade-in-up">
            Our Beautiful Memories
          </h1>
          <div className="flex items-center justify-center gap-2 text-pink-600">
            <Camera size={24} />
            <p className="text-lg">Each moment captured with love</p>
            <Camera size={24} />
          </div>
        </div>

        {/* Photo Display */}
        <div className="mb-8">
          <Card className="border-2 border-pink-200 glow-pink bounce-in">
            <CardContent className="p-6">
              <div className="relative">
                <img
                  src={photos[currentPhoto].src}
                  alt={`Memory ${currentPhoto + 1}`}
                  className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -top-2 -right-2">
                  <Heart className="text-red-500 heart-float" size={32} />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700 font-medium italic">
                  {photos[currentPhoto].caption}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <Button
            onClick={prevPhoto}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full p-3"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <span className="text-pink-600 font-medium">
            {currentPhoto + 1} of {photos.length}
          </span>
          
          <Button
            onClick={nextPhoto}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full p-3"
          >
            <ArrowRight size={20} />
          </Button>
        </div>

        {/* Photo Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`cursor-pointer transition-all duration-300 ${
                index === currentPhoto
                  ? 'ring-4 ring-pink-400 transform scale-105'
                  : 'hover:ring-2 hover:ring-pink-300'
              }`}
            >
              <img
                src={photo.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Navigation to Next Section */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/gift-box')}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg rounded-full glow-pink transition-all duration-300 transform hover:scale-105"
          >
            Open Your Gift Box 🎁
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
