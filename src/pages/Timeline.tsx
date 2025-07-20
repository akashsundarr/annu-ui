
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
    <div className="min-h-screen py-8 px-4 md:p-8 bg-background font-['Inter']">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in-minimal">
          <div className="w-12 h-12 mx-auto mb-4 bg-secondary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-semibold text-primary mb-4">Our Love Timeline</h1>
          <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
            Create your beautiful journey from the beginning to forever
          </p>
          
          {/* Add Story Button */}
          <div className="mt-6">
            <Button
              onClick={addNewEntry}
              variant="outline"
              className="px-6 py-2"
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
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

            <div className="space-y-8">
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
                    <div className="absolute left-6 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 z-10">
                      <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                        <IconComponent className="text-primary w-4 h-4" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
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
          <div className="text-center py-12">
            <div className="mb-6">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-primary mb-3">
                Let's Create Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Add your first timeline entry to begin our beautiful journey
              </p>
            </div>
            <Button
              onClick={addNewEntry}
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              <Plus className="mr-2 w-5 h-5" />
              Start Our Timeline
            </Button>
          </div>
        )}

        {/* Final Message */}
        {timelineEntries.length > 0 && (
          <div className="text-center mt-16 space-y-6">
            <div className="minimal-card p-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Here's to forever, just you and me
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                "Every day with you is a new adventure, every moment a new memory to treasure. 
                Thank you for being my partner, my best friend, and my greatest love. 
                Happy Birthday, my beautiful annuBee!"
              </p>
              <div className="text-right">
                <p className="text-base text-primary font-medium">
                  Forever yours, akashee
                </p>
              </div>
            </div>

            {/* Home Button */}
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-6 py-2"
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
