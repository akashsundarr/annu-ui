
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface MemoryCardGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame = ({ gifts, onComplete }: MemoryCardGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);

  // Initialize game
  useEffect(() => {
    const cardIcons = ['💕', '🌟', '🦋', '🌸', '✨', '🎀'];
    const gameCards = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(gameCards);
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].icon === cards[second].icon) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === 6) {
      setTimeout(() => {
        const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
        setWonGift(randomGift);
        setShowWin(true);
      }, 500);
    }
  }, [matchedPairs, gifts]);

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Memory Card Match 🧠
        </h1>
        <p className="text-muted-foreground font-light">
          Find all the matching pairs to win your gift!
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Matches: {matchedPairs}/6
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-md mx-auto mb-8">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || flippedCards.length === 2}
            className={`
              aspect-square rounded-xl shadow-lg transition-all duration-300 hover:scale-105
              ${card.isFlipped || card.isMatched 
                ? 'bg-card' 
                : 'bg-gradient-to-br from-accent to-secondary hover:from-accent/90 hover:to-secondary/90'
              }
              ${card.isMatched ? 'opacity-50' : ''}
            `}
          >
            {card.isFlipped || card.isMatched ? (
              <span className="text-2xl">{card.icon}</span>
            ) : (
              <Heart className="w-6 h-6 text-accent-foreground mx-auto" />
            )}
          </button>
        ))}
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
                  className="absolute text-yellow-400 text-lg animate-bounce"
                  style={{
                    left: `${15 + (i * 6)}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1.2s',
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Perfect Memory! 🎉
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

export default MemoryCardGame;
