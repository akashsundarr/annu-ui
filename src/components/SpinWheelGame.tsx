
import { useState } from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface SpinWheelGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

const SpinWheelGame = ({ gifts, onComplete }: SpinWheelGameProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const segments = gifts.slice(0, 6); // Use first 6 gifts for the wheel

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedGift(null);
    setShowPopup(false);
    
    const spins = 5 + Math.random() * 5;
    const segmentAngle = 360 / segments.length;
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + finalAngle;
    
    setRotation(totalRotation);
    
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedGift(segments[selectedIndex]);
      setShowPopup(true);
    }, 4000);
  };

  const handleComplete = () => {
    if (selectedGift) {
      const giftIndex = gifts.findIndex(g => g.name === selectedGift.name);
      onComplete(giftIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Spin the Wheel 🎡
        </h1>
        <p className="text-muted-foreground font-light">
          Spin to discover your first gift!
        </p>
      </div>

      {/* Wheel Container */}
      <div className="relative mb-8">
        <div className="relative">
          <svg
            width="280"
            height="280"
            className="drop-shadow-lg"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            }}
          >
            {segments.map((segment, index) => {
              const angle = (360 / segments.length) * index;
              const nextAngle = (360 / segments.length) * (index + 1);
              const startAngleRad = (angle * Math.PI) / 180;
              const endAngleRad = (nextAngle * Math.PI) / 180;
              
              const x1 = 140 + 130 * Math.cos(startAngleRad);
              const y1 = 140 + 130 * Math.sin(startAngleRad);
              const x2 = 140 + 130 * Math.cos(endAngleRad);
              const y2 = 140 + 130 * Math.sin(endAngleRad);
              
              const textAngle = angle + (360 / segments.length) / 2;
              const textX = 140 + 90 * Math.cos((textAngle * Math.PI) / 180);
              const textY = 140 + 90 * Math.sin((textAngle * Math.PI) / 180);

              const colors = ['hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];
              const segmentColor = colors[index % colors.length];

              return (
                <g key={index}>
                  <path
                    d={`M 140 140 L ${x1} ${y1} A 130 130 0 0 1 ${x2} ${y2} Z`}
                    fill={segmentColor}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY + 5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="24"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {segment.icon}
                  </text>
                </g>
              );
            })}
            
            <circle cx="140" cy="140" r="15" fill="white" stroke="hsl(var(--border))" strokeWidth="2" />
            <Gift className="w-4 h-4 text-primary" x="132" y="132" />
          </svg>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
            <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-primary"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground font-medium py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel ✨'}
      </Button>

      {/* Popup */}
      {showPopup && selectedGift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 scale-in-minimal">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-400 text-lg animate-bounce"
                  style={{
                    left: `${20 + (i * 8)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                >
                  🎉
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{selectedGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              You got {selectedGift.name}! 🎉
            </h2>
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-2 rounded-full font-medium"
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheelGame;
