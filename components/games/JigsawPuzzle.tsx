import React, { useState, useEffect } from 'react';

const puzzleTemplates = [
    { id: 'himalayas', imageUrl: 'https://picsum.photos/id/1018/300/300' }, // Mountain view
    { id: 'kerala', imageUrl: 'https://picsum.photos/id/1015/300/300' }, // Backwaters/river
    { id: 'rajasthan', imageUrl: 'https://picsum.photos/id/1048/300/300' }, // Architectural/desert
    { id: 'flowers', imageUrl: 'https://picsum.photos/id/1028/300/300' }, // Valley of flowers
    { id: 'beach', imageUrl: 'https://picsum.photos/id/1040/300/300' }, // Goa beach scene
];

const puzzleSize = 2;
const pieceSize = 150;

interface PuzzleTemplate {
    id: string;
    imageUrl: string;
}

interface Piece {
    id: string;
    style: React.CSSProperties;
}

const JigsawPuzzle: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<PuzzleTemplate | null>(null);
    const [completedToday, setCompletedToday] = useState(0);
    const [isLimitReached, setIsLimitReached] = useState(false);

    const [pieces, setPieces] = useState<Piece[]>([]);
    const [board, setBoard] = useState<(Piece | null)[]>(Array(puzzleSize * puzzleSize).fill(null));

    const progressKey = 'auraPuzzleProgress';
    const streakKey = 'auraPuzzleStreak';

    useEffect(() => {
        const savedProgress = localStorage.getItem(progressKey);
        if (savedProgress) {
            try {
                const { date, count } = JSON.parse(savedProgress);
                const today = new Date().toDateString();
                if (date === today) {
                    setCompletedToday(count);
                    if (count >= 5) setIsLimitReached(true);
                } else {
                    localStorage.removeItem(progressKey);
                }
            } catch (e) {
                localStorage.removeItem(progressKey);
            }
        }
    }, []);

    const generatePieces = (imageUrl: string) => {
      const newPieces = [];
      for (let i = 0; i < puzzleSize; i++) {
        for (let j = 0; j < puzzleSize; j++) {
          newPieces.push({
            id: `${i}-${j}`,
            style: {
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `-${j * pieceSize}px -${i * pieceSize}px`,
              width: `${pieceSize}px`,
              height: `${pieceSize}px`,
            }
          });
        }
      }
      return newPieces.sort(() => Math.random() - 0.5); // Shuffle
    };
    
    const handleSelectTemplate = (template: PuzzleTemplate) => {
        if (completedToday < 5) {
            setSelectedTemplate(template);
            setPieces(generatePieces(template.imageUrl));
            setBoard(Array(puzzleSize * puzzleSize).fill(null));
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, piece: Piece) => {
        e.dataTransfer.setData("pieceId", piece.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData("pieceId");
        const [row, col] = pieceId.split('-').map(Number);
        
        if (index === row * puzzleSize + col) {
            const piece = pieces.find(p => p.id === pieceId);
            if (piece) {
                const newBoard = [...board];
                newBoard[index] = piece;
                setBoard(newBoard);
                setPieces(pieces.filter(p => p.id !== pieceId));
            }
        }
    };
      
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
      
    const isComplete = board.every(cell => cell !== null);

    const handleFinish = () => {
        const newCount = completedToday + 1;
        setCompletedToday(newCount);
        localStorage.setItem(progressKey, JSON.stringify({ date: new Date().toDateString(), count: newCount }));

        // Update streak
        try {
            const streakData = JSON.parse(localStorage.getItem(streakKey) || '{}');
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const lastPlayedDate = streakData.lastPlayedDate ? new Date(streakData.lastPlayedDate) : null;
            let currentStreak = streakData.count || 0;

            if (lastPlayedDate && lastPlayedDate.toDateString() === yesterday.toDateString()) {
                currentStreak++; // Continued streak
            } else if (!lastPlayedDate || lastPlayedDate.toDateString() !== today.toDateString()) {
                currentStreak = 1; // New or reset streak
            }
            // if last played is today, streak does not increase.
            
            localStorage.setItem(streakKey, JSON.stringify({ count: currentStreak, lastPlayedDate: today.toISOString() }));
        } catch (e) {
            localStorage.setItem(streakKey, JSON.stringify({ count: 1, lastPlayedDate: new Date().toISOString() }));
        }

        if (newCount >= 5) {
            setIsLimitReached(true);
        }
        setSelectedTemplate(null);
    };

    if (isLimitReached) {
        return (
            <div className="text-center p-8 bg-white/40 rounded-lg animate-fade-in">
                <h2 className="text-2xl font-bold text-accent mb-4">🎉 Great job!</h2>
                <p className="text-text-body">You’ve completed today’s puzzles. <br/> Come back tomorrow for new ones.</p>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col items-center justify-center p-2 w-full">
            {!selectedTemplate ? (
                <div className="w-full animate-fade-in">
                    <h3 className="text-lg font-semibold text-text-body mb-4 text-center">Select a puzzle to start relaxing.</h3>
                    <div className="w-full px-4 mb-2">
                         <p className="text-sm text-text-muted mb-1 text-center">Today's Progress: {completedToday} / 5</p>
                         <div className="w-full bg-white/40 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full" style={{ width: `${(completedToday / 5) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                        {puzzleTemplates.map(template => (
                           <div key={template.id} onClick={() => handleSelectTemplate(template)} className="bg-white/40 p-2 rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center">
                               <img src={template.imageUrl} alt={template.id} className="w-32 h-32 rounded-md object-cover"/>
                               <p className="font-semibold text-text-body mt-2 capitalize">{template.id}</p>
                           </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center animate-fade-in">
                    <div className="w-full flex justify-between items-center mb-4 px-2">
                        <button onClick={() => setSelectedTemplate(null)} className="text-sm bg-white/60 hover:bg-accent-light px-3 py-1 rounded-full transition-colors">Back</button>
                        <h3 className="text-lg font-semibold text-text-body capitalize">{selectedTemplate.id} Puzzle</h3>
                         {isComplete ? (
                           <button onClick={handleFinish} className="text-sm bg-accent text-white font-semibold hover:bg-opacity-90 px-3 py-1 rounded-full transition-colors">Finish</button>
                         ) : (
                           <div className="w-[60px]"></div> // Placeholder for alignment
                         )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                      <div className="flex flex-col items-center">
                        <div className="grid grid-cols-2 gap-1 bg-white/40 p-1 rounded-lg" style={{ width: `${puzzleSize * pieceSize + (puzzleSize-1)}px`}}>
                          {board.map((piece, index) => (
                            <div
                              key={index}
                              onDrop={(e) => handleDrop(e, index)}
                              onDragOver={handleDragOver}
                              className="bg-white/20"
                              style={{ width: `${pieceSize}px`, height: `${pieceSize}px` }}
                            >
                              {piece && <div style={piece.style} />}
                            </div>
                          ))}
                        </div>
                        {isComplete && <p className="mt-4 text-accent font-bold text-xl animate-fade-in">Puzzle Complete!</p>}
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-text-body mb-2">Pieces</h3>
                        <div className="flex flex-wrap gap-2 p-2 rounded-lg bg-white/20" style={{ minHeight: `${pieceSize+16}px`, width: `${puzzleSize * pieceSize + 16}px` }}>
                          {pieces.map(piece => (
                            <div
                              key={piece.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, piece)}
                              style={piece.style}
                              className="cursor-move rounded-md shadow-md"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JigsawPuzzle;