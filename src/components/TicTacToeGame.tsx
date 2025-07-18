import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Gift {
  name: string;
  icon: string;
  caption: string;
}

interface TicTacToeGameProps {
  gifts: Gift[];
  onComplete: (giftIndex: number) => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToeGame = ({ gifts, onComplete }: TicTacToeGameProps) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing');
  const [winner, setWinner] = useState<Player>(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null);
  };

  const getAvailableMoves = (board: Board): number[] => {
    return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
  };

  const makeAIMove = (board: Board): number => {
    const availableMoves = getAvailableMoves(board);
    
    // Simple AI: try to win, then block player, then random
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'O';
      if (checkWinner(testBoard) === 'O') {
        return move;
      }
    }

    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'X';
      if (checkWinner(testBoard) === 'X') {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => availableMoves.includes(corner));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const playerWin = checkWinner(newBoard);
    if (playerWin === 'X') {
      setWinner('X');
      setGameStatus('won');
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      return;
    }

    // AI move
    setTimeout(() => {
      const aiMove = makeAIMove(newBoard);
      const boardWithAI = [...newBoard];
      boardWithAI[aiMove] = 'O';
      setBoard(boardWithAI);

      const aiWin = checkWinner(boardWithAI);
      if (aiWin === 'O') {
        setWinner('O');
        setGameStatus('lost');
      } else if (isBoardFull(boardWithAI)) {
        setGameStatus('draw');
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
    setWinner(null);
  };

  const handleComplete = () => {
    const randomGiftIndex = Math.floor(Math.random() * gifts.length);
    onComplete(randomGiftIndex);
  };

  useEffect(() => {
    if (gameStatus === 'won') {
      setTimeout(handleComplete, 1500);
    }
  }, [gameStatus]);

  const getCellClass = (index: number) => {
    const baseClass = "w-20 h-20 border-2 border-accent/30 rounded-lg flex items-center justify-center text-3xl font-bold transition-all duration-200 hover:bg-accent/10 cursor-pointer";
    if (board[index]) {
      return baseClass + " cursor-not-allowed";
    }
    if (gameStatus !== 'playing' || !isPlayerTurn) {
      return baseClass + " cursor-not-allowed opacity-60";
    }
    return baseClass + " hover:scale-105 hover:shadow-lg";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-lg animate-bounce opacity-30"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '4s',
            }}
          >
            💕
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto text-center space-y-8 z-10">
        <div className="space-y-4 fade-in-minimal">
          <div className="text-6xl gentle-float">❌⭕</div>
          <h2 className="text-3xl font-light text-foreground">
            Tic Tac Toe Challenge
          </h2>
          <p className="text-muted-foreground font-light">
            Beat the AI to unlock your gift! You are ❌
          </p>
        </div>

        <Card className="minimal-card bg-gradient-to-br from-card to-accent/10 border-accent/20">
          <CardContent className="p-8">
            {/* Game Board */}
            <div className="grid grid-cols-3 gap-2 mb-6 mx-auto w-fit">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={getCellClass(index)}
                >
                  <span className={cell === 'X' ? 'text-primary' : cell === 'O' ? 'text-secondary' : ''}>
                    {cell}
                  </span>
                </button>
              ))}
            </div>

            {/* Game Status */}
            <div className="space-y-4">
              {gameStatus === 'playing' && (
                <p className="text-muted-foreground">
                  {isPlayerTurn ? "Your turn! Pick a square" : "AI is thinking..."}
                </p>
              )}
              
              {gameStatus === 'won' && (
                <div className="space-y-3 scale-in-minimal">
                  <div className="text-4xl">🎉</div>
                  <p className="text-primary font-medium text-lg">
                    You Won! Unlocking your gift...
                  </p>
                </div>
              )}
              
              {gameStatus === 'lost' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    AI won this round! Try again?
                  </p>
                  <Button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
                  >
                    Play Again
                  </Button>
                </div>
              )}
              
              {gameStatus === 'draw' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    It's a draw! Try again?
                  </p>
                  <Button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicTacToeGame;