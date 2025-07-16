
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Calendar, MapPin, Star, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Timeline = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    {
      title: "When We First Met",
      date: "The Day Everything Changed",
      description: "That magical moment when our eyes met and I knew you were special. Little did I know you'd become my whole world.",
      icon: Heart,
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Our First Photo Together",
      date: "Captured Forever",
      description: "The first of many beautiful memories we'd capture together. Your smile in that photo still makes my heart skip a beat.",
      icon: Camera,
      color: "from-red-400 to-red-600"
    },
    {
      title: "First Date Adventure",
      date: "Where It All Began",
      description: "Nervous butterflies, endless conversations, and the realization that I wanted to spend forever getting to know you better.",
      icon: MapPin,
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Our Silly Moments",
      date: "Laughter & Joy",
      description: "All those times we laughed until our stomachs hurt, made silly faces, and created inside jokes that only we understand.",
      icon: Star,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "When I Knew You Were 'The One'",
      date: "Love Realized",
      description: "That perfect moment when I realized I wanted to wake up next to you every morning and fall asleep holding you every night.",
      icon: Heart,
      color: "from-pink-600 to-red-600"
    },
    {
      title: "Today & Forever",
      date: "Your Special Day",
      description: "Celebrating you today and looking forward to all the birthdays, adventures, and beautiful moments we'll share together.",
      icon: Calendar,
      color: "from-red-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6 relative">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 heart-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
            }}
            size={28}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 fade-in-up">
            Our Love Timeline
          </h1>
          <p className="text-lg text-gray-600">
            The beautiful journey of us, from the beginning to forever 💕
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 via-red-300 to-pink-300 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-6 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 z-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center glow-pink`}>
                      <IconComponent className="text-white" size={16} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    isEven ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <Card className="border-2 border-pink-200 glow-pink hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <IconComponent className={`text-pink-500`} size={24} />
                          <h3 className="text-xl font-bold text-gray-800">
                            {event.title}
                          </h3>
                        </div>
                        
                        <p className="text-pink-600 font-medium text-sm mb-3">
                          {event.date}
                        </p>
                        
                        <p className="text-gray-700 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16 space-y-8">
          <Card className="border-2 border-red-200 glow-red">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4">
                Here's to forever, just you and me ❤️
              </h2>
              <p className="text-xl text-gray-700 italic leading-relaxed">
                "Every day with you is a new adventure, every moment a new memory to treasure. 
                Thank you for being my partner, my best friend, and my greatest love. 
                Happy Birthday, my beautiful annuBee!"
              </p>
              <div className="mt-6 text-right">
                <p className="text-pink-600 font-medium">
                  Forever yours, akashee 💕
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Home Button */}
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 text-lg rounded-full glow-pink transition-all duration-300 transform hover:scale-105"
          >
            <Home className="mr-2" size={20} />
            Back to Beginning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
