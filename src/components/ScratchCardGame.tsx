
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface ScratchCardGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

const ScratchCardGame = ({ gifts, onComplete }: ScratchCardGameProps) => {
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Draw scratch surface
    ctx.fillStyle = '#c9c9c9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add scratch texture
    ctx.fillStyle = '#888';
    ctx.font = '20px Arial';
    ctx.fillText('Scratch to reveal!', 80, 100);
  }, []);

  const startScratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e);
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 50 && !isScratched) {
      setIsScratched(true);
      setTimeout(() => {
        const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
        setWonGift(randomGift);
        setShowWin(true);
      }, 500);
    }
  };

  const stopScratch = () => {
    isDrawing.current = false;
  };

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Scratch Card 🎫
        </h1>
        <p className="text-muted-foreground font-light">
          Scratch away to reveal your surprise gift!
        </p>
      </div>

      {/* Scratch Card */}
      <div className="relative bg-card rounded-2xl shadow-lg p-8 mb-8">
        <div className="absolute inset-8 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl flex items-center justify-center">
          <div className="text-4xl">
            {wonGift ? wonGift.icon : '🎁'}
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          onMouseDown={startScratch}
          onMouseMove={scratch}
          onMouseUp={stopScratch}
          onMouseLeave={stopScratch}
          className="cursor-crosshair rounded-xl"
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Progress */}
      <div className="text-center mb-4">
        <p className="text-muted-foreground text-sm">
          Scratched: {Math.round(scratchPercentage)}%
        </p>
      </div>

      {/* Win Popup */}
      {showWin && wonGift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 scale-in-minimal">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-orange-400 text-lg animate-bounce"
                  style={{
                    left: `${10 + (i * 6)}%`,
                    top: `${10 + (i % 4) * 22}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.2s',
                  }}
                >
                  🎫
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Scratch Revealed! 🎉
            </h2>
            <p className="text-muted-foreground mb-6">
              You won: {wonGift.name}
            </p>
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

export default ScratchCardGame;
