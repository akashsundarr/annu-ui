
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface PuzzleGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

interface PuzzlePiece {
  id: number;
  position: number;
  correctPosition: number;
}

const PuzzleGame = ({ gifts, onComplete }: PuzzleGameProps) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [showWin, setShowWin] = useState(false);
  const [wonGift, setWonGift] = useState<Gift | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const initializePuzzle = () => {
    const puzzlePieces: PuzzlePiece[] = [];
    for (let i = 0; i < 9; i++) {
      puzzlePieces.push({
        id: i,
        position: i,
        correctPosition: i,
      });
    }
    
    // Shuffle pieces
    for (let i = puzzlePieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = puzzlePieces[i].position;
      puzzlePieces[i].position = puzzlePieces[j].position;
      puzzlePieces[j].position = temp;
    }
    
    setPieces(puzzlePieces);
    setGameStarted(true);
  };

  const handlePieceClick = (pieceId: number) => {
    const emptySpot = pieces.find(p => p.position === 8);
    const clickedPiece = pieces.find(p => p.id === pieceId);
    
    if (!emptySpot || !clickedPiece) return;
    
    // Check if pieces are adjacent
    const emptyRow = Math.floor(emptySpot.position / 3);
    const emptyCol = emptySpot.position % 3;
    const clickedRow = Math.floor(clickedPiece.position / 3);
    const clickedCol = clickedPiece.position % 3;
    
    const isAdjacent = 
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow);
    
    if (isAdjacent) {
      setPieces(prev => prev.map(piece => {
        if (piece.id === pieceId) {
          return { ...piece, position: emptySpot.position };
        }
        if (piece.position === 8) {
          return { ...piece, position: clickedPiece.position };
        }
        return piece;
      }));
    }
  };

  // Check for win condition
  useEffect(() => {
    if (gameStarted && pieces.length > 0) {
      const isComplete = pieces.every(piece => piece.position === piece.correctPosition);
      if (isComplete) {
        setTimeout(() => {
          const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
          setWonGift(randomGift);
          setShowWin(true);
        }, 500);
      }
    }
  }, [pieces, gameStarted, gifts]);

  const handleComplete = () => {
    if (wonGift) {
      const giftIndex = gifts.findIndex(g => g.name === wonGift.name);
      onComplete(giftIndex);
    }
  };

  const getPieceStyle = (position: number) => {
    const row = Math.floor(position / 3);
    const col = position % 3;
    return {
      transform: `translate(${col * 100}%, ${row * 100}%)`,
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Title */}
      <div className="text-center mb-8 fade-in-minimal">
        <h1 className="text-3xl font-light text-foreground mb-2">
          Puzzle Challenge 🧩
        </h1>
        <p className="text-muted-foreground font-light">
          Arrange the heart pieces to complete the puzzle!
        </p>
      </div>

      {!gameStarted ? (
        <Button
          onClick={initializePuzzle}
          className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Start Puzzle
        </Button>
      ) : (
        /* Puzzle Grid */
        <div className="relative w-72 h-72 bg-card rounded-2xl shadow-lg p-4">
          <div className="relative w-full h-full grid grid-cols-3 gap-1">
            {pieces.map((piece) => (
              piece.correctPosition !== 8 && (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  className={`
                    absolute w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 
                    rounded-lg shadow-md transition-all duration-300 hover:scale-105
                    flex items-center justify-center text-2xl
                    ${piece.position === 8 ? 'opacity-0' : 'opacity-100'}
                  `}
                  style={getPieceStyle(piece.position)}
                >
                  💖
                </button>
              )
            ))}
          </div>
        </div>
      )}

      {/* Win Popup */}
      {showWin && wonGift && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 scale-in-minimal">
            {/* Confetti Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-purple-400 text-lg animate-bounce"
                  style={{
                    left: `${15 + (i * 7)}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '1s',
                  }}
                >
                  🧩
                </div>
              ))}
            </div>
            
            <div className="text-4xl mb-4 gentle-float">{wonGift.icon}</div>
            <h2 className="text-2xl font-medium text-foreground mb-4">
              Puzzle Solved! 🎉
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

export default PuzzleGame;
