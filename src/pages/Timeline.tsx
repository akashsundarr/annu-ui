
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
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-minimal">
          <h1 className="text-3xl font-light text-foreground mb-4">Our Love Timeline</h1>
          <p className="text-muted-foreground font-light">
            Create your beautiful journey from the beginning to forever
          </p>
          
          {/* Add Story Button */}
          <div className="mt-6">
            <Button
              onClick={addNewEntry}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="mr-2 w-4 h-4" />
              Add Timeline Entry
            </Button>
          </div>
        </div>

        {/* Timeline */}
        {timelineEntries.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

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
                    <div className="absolute left-6 md:left-1/2 w-8 h-8 transform md:-translate-x-1/2 z-10">
                      <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                        <IconComponent className="text-primary-foreground w-4 h-4" />
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
                        className="absolute -top-2 -right-2 z-20 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
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
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-light text-foreground mb-2">
                Start Creating Your Timeline
              </h2>
              <p className="text-muted-foreground">
                Add your first timeline entry to begin building your love story
              </p>
            </div>
            <Button
              onClick={addNewEntry}
              className="px-8 py-3 font-medium"
            >
              <Plus className="mr-2 w-4 h-4" />
              Create First Entry
            </Button>
          </div>
        )}

        {/* Final Message - Only show if there are entries */}
        {timelineEntries.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Timeline;
