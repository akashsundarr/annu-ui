
import { useState } from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const segments = [
    { label: '🍫 Chocolate', color: '#FFB6C1' },
    { label: '💄 Lipstick', color: '#FFE4E1' },
    { label: '🕷️ Spiderman', color: '#FFCCCB' },
    { label: '💍 Ring', color: '#FFF8DC' },
    { label: '📓 Drawing Book', color: '#FFFACD' },
    { label: '✏️ Pencil', color: '#F0E68C' },
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedSegment(null);
    
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const segmentAngle = 360 / segments.length;
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + finalAngle;
    
    setRotation(totalRotation);
    
    // Determine which segment was selected
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSegment(segments[selectedIndex].label);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 p-6 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-xl animate-bounce"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s',
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 text-sm animate-pulse"
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2 font-serif">
          Spin to reveal your gift 🎁
        </h1>
        <p className="text-lg text-pink-500 font-light">
          Let's see what surprise awaits you!
        </p>
      </div>

      {/* Wheel Container */}
      <div className="relative mb-8">
        {/* Wheel */}
        <div className="relative">
          <svg
            width="300"
            height="300"
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
              
              const x1 = 150 + 140 * Math.cos(startAngleRad);
              const y1 = 150 + 140 * Math.sin(startAngleRad);
              const x2 = 150 + 140 * Math.cos(endAngleRad);
              const y2 = 150 + 140 * Math.sin(endAngleRad);
              
              const textAngle = angle + (360 / segments.length) / 2;
              const textX = 150 + 100 * Math.cos((textAngle * Math.PI) / 180);
              const textY = 150 + 100 * Math.sin((textAngle * Math.PI) / 180);

              return (
                <g key={index}>
                  <path
                    d={`M 150 150 L ${x1} ${y1} A 140 140 0 0 1 ${x2} ${y2} Z`}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#4a4a4a"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
            
            {/* Center circle */}
            <circle
              cx="150"
              cy="150"
              r="20"
              fill="white"
              stroke="#ff69b4"
              strokeWidth="3"
            />
            <Gift className="w-6 h-6 text-pink-500" x="138" y="138" />
          </svg>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-pink-500"></div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel ✨'}
      </Button>

      {/* Result */}
      {selectedSegment && (
        <div className="mt-8 text-center animate-fade-in bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            🎉 You got: {selectedSegment} 🎉
          </h2>
          <p className="text-pink-500">What a wonderful surprise!</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
