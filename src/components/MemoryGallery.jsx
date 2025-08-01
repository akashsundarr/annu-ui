import { useState } from 'react';
import { ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MemoryGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const memories = [
    {
      src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
      caption: "Our first adventure together 💕",
    },
    {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      caption: "Your beautiful smile that lights up my world ✨",
    },
    {
      src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800",
      caption: "Golden moments with you 🌅",
    },
    {
      src: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800",
      caption: "Laughing until our hearts were full 😄",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      caption: "Dancing through life together 💃",
    },
    {
      src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
      caption: "Every silly moment is precious with you 🤗",
    },
  ];

  const nextPhoto = () => {
    setShowHearts(true);
    setCurrentIndex((prev) => (prev + 1) % memories.length);
    
    setTimeout(() => {
      setShowHearts(false);
    }, 800);
  };

  const currentMemory = memories[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-12 px-6 relative overflow-hidden">
      {/* Floating Hearts Animation */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            >
              <Heart className="w-6 h-6 text-pink-400 fill-current" />
            </div>
          ))}
        </div>
      )}

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-200 text-2xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s',
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 fade-in-minimal">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 font-serif">
            Our Memories ❤️
          </h1>
          <p className="text-lg text-pink-400 font-light">
            {currentIndex + 1} of {memories.length}
          </p>
        </div>

        {/* Memory Card */}
        <Card className="relative overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm border-pink-200 rounded-3xl">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={currentMemory.src}
              alt="Memory"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          <div className="p-8 text-center">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              {currentMemory.caption}
            </p>
          </div>
        </Card>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Button
            onClick={nextPhoto}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {currentIndex === memories.length - 1 ? 'Start Over' : 'Next Memory'}
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemoryGallery;