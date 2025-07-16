
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const PhotoGallery = () => {
  const navigate = useNavigate();

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

        {/* Photo Carousel */}
        <div className="mb-12 scale-in-minimal">
          <Carousel className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <Card className="minimal-card">
                    <CardContent className="p-6">
                      <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden rounded-lg">
                          <img
                            src={photo.src}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-lg text-muted-foreground font-light italic">
                          {photo.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Photo Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {photos.map((photo, index) => (
            <button
              key={index}
              className="relative overflow-hidden rounded-lg transition-all duration-200 hover:scale-105 opacity-60 hover:opacity-100"
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
