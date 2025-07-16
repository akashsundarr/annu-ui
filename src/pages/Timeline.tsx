
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Calendar, MapPin, Star, Home, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TimelineCard from '@/components/TimelineCard';

const Timeline = () => {
  const navigate = useNavigate();

  const timelineEvents = [
    {
      title: "When We First Met",
      date: "The Day Everything Changed",
      description: "That magical moment when our eyes met and I knew you were special. Little did I know you'd become my whole world.",
      icon: Heart,
    },
    {
      title: "Our First Photo Together",
      date: "Captured Forever",
      description: "The first of many beautiful memories we'd capture together. Your smile in that photo still makes my heart skip a beat.",
      icon: Camera,
    },
    {
      title: "First Date Adventure",
      date: "Where It All Began",
      description: "Nervous butterflies, endless conversations, and the realization that I wanted to spend forever getting to know you better.",
      icon: MapPin,
    },
    {
      title: "Our Silly Moments",
      date: "Laughter & Joy",
      description: "All those times we laughed until our stomachs hurt, made silly faces, and created inside jokes that only we understand.",
      icon: Star,
    },
    {
      title: "When I Knew You Were 'The One'",
      date: "Love Realized",
      description: "That perfect moment when I realized I wanted to wake up next to you every morning and fall asleep holding you every night.",
      icon: Heart,
    },
    {
      title: "Today & Forever",
      date: "Your Special Day",
      description: "Celebrating you today and looking forward to all the birthdays, adventures, and beautiful moments we'll share together.",
      icon: Calendar,
    }
  ];

  const handleAddNewStory = () => {
    // This could trigger adding a new editable card
    console.log('Adding new story');
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-minimal">
          <h1 className="text-3xl font-light text-foreground mb-4">Our Love Timeline</h1>
          <p className="text-muted-foreground font-light">
            The beautiful journey of us, from the beginning to forever
          </p>
          
          {/* Add Story Button */}
          <div className="mt-6">
            <Button
              onClick={handleAddNewStory}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Your Story
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {/* Editable Timeline Card Example */}
            <div className="relative flex items-center md:flex-row fade-in-minimal">
              {/* Timeline Icon */}
              <div className="absolute left-6 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 z-10">
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                  <Plus className="text-primary-foreground w-4 h-4" />
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-5/12 ml-20 md:ml-0 md:mr-8">
                <TimelineCard
                  isEditable={true}
                  IconComponent={Camera}
                />
              </div>
            </div>

            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isEven = (index + 1) % 2 === 0; // Offset by 1 due to the editable card

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } fade-in-minimal`}
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-6 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 z-10">
                    <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                      <IconComponent className="text-primary-foreground w-4 h-4" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    isEven ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <TimelineCard
                      initialTitle={event.title}
                      initialDate={event.date}
                      initialDescription={event.description}
                      IconComponent={IconComponent}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16 space-y-8">
          <Card className="minimal-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-light text-foreground mb-4">
                Here's to forever, just you and me
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
                "Every day with you is a new adventure, every moment a new memory to treasure. 
                Thank you for being my partner, my best friend, and my greatest love. 
                Happy Birthday, my beautiful annuBee!"
              </p>
              <div className="mt-6 text-right">
                <p className="text-primary font-medium">
                  Forever yours, akashee
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Home Button */}
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="px-8 py-3 font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Beginning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
