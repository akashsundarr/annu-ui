
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Calendar, MapPin, Star, Home, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TimelineCard from '@/components/TimelineCard';

interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Timeline = () => {
  const navigate = useNavigate();
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);

  const iconOptions = [Heart, Camera, Calendar, MapPin, Star];

  const addNewEntry = () => {
    const newEntry: TimelineEntry = {
      id: Date.now().toString(),
      title: '',
      date: '',
      description: '',
      image: '',
      icon: iconOptions[timelineEntries.length % iconOptions.length]
    };
    setTimelineEntries([...timelineEntries, newEntry]);
  };

  const removeEntry = (id: string) => {
    setTimelineEntries(timelineEntries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, updatedData: Partial<TimelineEntry>) => {
    setTimelineEntries(timelineEntries.map(entry => 
      entry.id === id ? { ...entry, ...updatedData } : entry
    ));
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-accent rounded-full gentle-float"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i % 2) * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: '6s',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-minimal">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center gentle-float">
            <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-light text-foreground mb-4">Our Love Timeline</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Create your beautiful journey from the beginning to forever
          </p>
          
          {/* Add Story Button */}
          <div className="mt-8">
            <Button
              onClick={addNewEntry}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full transition-all duration-200"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Our Story
            </Button>
          </div>
        </div>

        {/* Timeline */}
        {timelineEntries.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent to-secondary transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {timelineEntries.map((entry, index) => {
                const IconComponent = entry.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={entry.id}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } fade-in-minimal group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Timeline Icon */}
                    <div className="absolute left-6 md:left-1/2 w-10 h-10 transform md:-translate-x-1/2 z-10">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg">
                        <IconComponent className="text-accent-foreground w-5 h-5" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    } relative`}>
                      {/* Delete Button */}
                      <Button
                        onClick={() => removeEntry(entry.id)}
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 z-20 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <TimelineCard
                        isEditable={true}
                        initialTitle={entry.title}
                        initialDate={entry.date}
                        initialDescription={entry.description}
                        initialImage={entry.image}
                        IconComponent={IconComponent}
                        onSave={(data) => updateEntry(entry.id, data)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {timelineEntries.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-8">
              <Heart className="w-20 h-20 text-accent mx-auto mb-6 gentle-float" />
              <h2 className="text-2xl font-light text-foreground mb-4">
                Let's Create Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Add your first timeline entry to begin our beautiful journey
              </p>
            </div>
            <Button
              onClick={addNewEntry}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 hover:scale-105 border-0"
            >
              <Plus className="mr-2 w-5 h-5" />
              Start Our Timeline
            </Button>
          </div>
        )}

        {/* Final Message */}
        {timelineEntries.length > 0 && (
          <div className="text-center mt-20 space-y-8">
            <Card className="minimal-card bg-gradient-to-br from-card to-accent/10 border-accent/20">
              <CardContent className="p-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center gentle-float">
                  <Heart className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                </div>
                <h2 className="text-3xl font-light text-foreground mb-6">
                  Here's to forever, just you and me
                </h2>
                <p className="text-xl text-muted-foreground font-light leading-relaxed italic mb-8">
                  "Every day with you is a new adventure, every moment a new memory to treasure. 
                  Thank you for being my partner, my best friend, and my greatest love. 
                  Happy Birthday, my beautiful annuBee!"
                </p>
                <div className="text-right">
                  <p className="text-lg text-primary font-medium">
                    Forever yours, akashee
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Home Button */}
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-8 py-3 font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 rounded-full"
            >
              <Home className="mr-2 w-4 h-4" />
              Back to Beginning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
