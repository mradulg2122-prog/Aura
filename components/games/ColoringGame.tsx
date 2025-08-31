import React, { useState, useEffect } from 'react';

const colors = ['#fecaca', '#fcd34d', '#a7f3d0', '#a5f3fc', '#d8b4fe', '#f9a8d4', '#ffffff', '#9ca3af'];

interface PathProps { 
    pathColors: Record<string, string>; 
    onPathClick: (id: string) => void 
}

const MandalaTemplate: React.FC<PathProps> = ({ pathColors, onPathClick }) => (
    <svg viewBox="0 0 200 200" className="w-full h-auto max-w-sm mx-auto">
        <defs>
            <g id="mandala-petal">
                <path d="M 100 100 C 110 80, 130 80, 140 100 C 130 120, 110 120, 100 100 Z" />
            </g>
        </defs>
        {[...Array(8)].map((_, i) => (
             <use 
                key={`petal-group-${i}`} 
                href="#mandala-petal" 
                transform={`rotate(${i * 45} 100 100)`} 
                fill={pathColors[`p${i}`] || 'white'}
                onClick={() => onPathClick(`p${i}`)}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                stroke="#4b5563" strokeWidth="0.5"
             />
        ))}
        <circle cx="100" cy="100" r="30" fill={pathColors['c1'] || 'white'} onClick={() => onPathClick('c1')} className="cursor-pointer transition-all duration-200 hover:opacity-80" stroke="#4b5563" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="15" fill={pathColors['c2'] || 'white'} onClick={() => onPathClick('c2')} className="cursor-pointer transition-all duration-200 hover:opacity-80" stroke="#4b5563" strokeWidth="0.5" />
    </svg>
);

const FlowerTemplate: React.FC<PathProps> = ({ pathColors, onPathClick }) => (
    <svg viewBox="0 0 100 100" className="w-full h-auto max-w-sm mx-auto">
        <circle cx="50" cy="50" r="15" fill={pathColors['center'] || 'white'} onClick={() => onPathClick('center')} stroke="#4b5563" strokeWidth="0.5" className="cursor-pointer hover:opacity-80"/>
        {[...Array(6)].map((_, i) => (
            <ellipse key={`petal-${i}`} cx="50" cy="50" rx="10" ry="25" transform={`rotate(${i * 60} 50 50)`} fill={pathColors[`petal${i}`] || 'white'} onClick={() => onPathClick(`petal${i}`)} stroke="#4b5563" strokeWidth="0.5" className="cursor-pointer hover:opacity-80" />
        ))}
    </svg>
);

const NatureTemplate: React.FC<PathProps> = ({ pathColors, onPathClick }) => (
    <svg viewBox="0 0 200 150" className="w-full h-auto max-w-sm mx-auto">
        <rect width="200" height="150" fill={pathColors['sky'] || '#a5f3fc'} onClick={() => onPathClick('sky')} className="cursor-pointer hover:opacity-80" />
        <circle cx="40" cy="40" r="20" fill={pathColors['sun'] || '#fcd34d'} onClick={() => onPathClick('sun')} className="cursor-pointer hover:opacity-80" />
        <path d="M 0 150 L 0 100 Q 50 70, 100 100 T 200 100 L 200 150 Z" fill={pathColors['mountain1'] || '#9ca3af'} onClick={() => onPathClick('mountain1')} className="cursor-pointer hover:opacity-80" />
        <path d="M 0 150 L 0 120 Q 75 100, 150 120 T 200 110 L 200 150 Z" fill={pathColors['mountain2'] || '#6b7280'} onClick={() => onPathClick('mountain2')} className="cursor-pointer hover:opacity-80" />
        <rect y="130" width="200" height="20" fill={pathColors['ground'] || '#a7f3d0'} onClick={() => onPathClick('ground')} className="cursor-pointer hover:opacity-80" />
    </svg>
);

interface ColoringTemplate {
  id: string;
  name: string;
  Component: React.FC<PathProps>;
}

const templates: ColoringTemplate[] = [
    { id: 'mandala', name: 'Mandala', Component: MandalaTemplate },
    { id: 'flower', name: 'Flower', Component: FlowerTemplate },
    { id: 'nature', name: 'Nature Scene', Component: NatureTemplate },
];

const ColoringGame: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<ColoringTemplate | null>(null);
    const [pathColors, setPathColors] = useState<Record<string, string>>({});
    const [completedToday, setCompletedToday] = useState(0);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const progressKey = 'auraColoringProgress';

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

    useEffect(() => {
        if (selectedTemplate) {
            const savedColors = localStorage.getItem(`auraColoring-${selectedTemplate.id}`);
            if (savedColors) {
                try {
                    setPathColors(JSON.parse(savedColors));
                } catch (e) {
                    setPathColors({});
                }
            } else {
                setPathColors({});
            }
        }
    }, [selectedTemplate]);

    const handlePathClick = (id: string) => {
        const newColors = { ...pathColors, [id]: selectedColor };
        setPathColors(newColors);
        if (selectedTemplate) {
            localStorage.setItem(`auraColoring-${selectedTemplate.id}`, JSON.stringify(newColors));
        }
    };

    const handleFinish = () => {
        const newCount = completedToday + 1;
        setCompletedToday(newCount);
        localStorage.setItem(progressKey, JSON.stringify({ date: new Date().toDateString(), count: newCount }));
        
        if (selectedTemplate) {
            localStorage.removeItem(`auraColoring-${selectedTemplate.id}`);
        }

        if (newCount >= 5) {
            setIsLimitReached(true);
            setSelectedTemplate(null);
        } else {
            const currentIndex = templates.findIndex(t => t.id === selectedTemplate?.id);
            const nextIndex = (currentIndex + 1) % templates.length;
            setSelectedTemplate(templates[nextIndex]);
        }
    };

    const handleSelectTemplate = (template: ColoringTemplate) => {
        if (completedToday < 5) {
            setSelectedTemplate(template);
        }
    };
    
    if (isLimitReached) {
        return (
            <div className="text-center p-8 bg-white/40 rounded-lg animate-fade-in">
                <h2 className="text-2xl font-bold text-accent mb-4">🎉 Great job!</h2>
                <p className="text-text-body">You’ve completed today’s relaxation session. <br/> Please come back tomorrow for new templates 🌸</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-2 w-full">
            {!selectedTemplate ? (
                <div className="w-full animate-fade-in">
                    <h3 className="text-lg font-semibold text-text-body mb-4 text-center">Select a template to start coloring.</h3>
                    <div className="w-full px-4 mb-2">
                         <p className="text-sm text-text-muted mb-1 text-center">Today's Progress: {completedToday} / 5</p>
                         <div className="w-full bg-white/40 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-secondary to-accent h-2.5 rounded-full" style={{ width: `${(completedToday / 5) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
                        {templates.map(template => (
                           <div key={template.id} onClick={() => handleSelectTemplate(template)} className="bg-white/40 p-4 rounded-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center">
                               <div className="w-32 h-32 border border-white/50 rounded-md p-1 mb-2"><template.Component pathColors={{}} onPathClick={() => {}} /></div>
                               <p className="font-semibold text-text-body">{template.name}</p>
                           </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center animate-fade-in">
                    <div className="w-full flex justify-between items-center mb-4 px-2">
                        <button onClick={() => setSelectedTemplate(null)} className="text-sm bg-white/60 hover:bg-accent-light px-3 py-1 rounded-full transition-colors">Back</button>
                        <h3 className="text-lg font-semibold text-text-body">{selectedTemplate.name}</h3>
                        <button onClick={handleFinish} className="text-sm bg-accent text-white font-semibold hover:bg-opacity-90 px-3 py-1 rounded-full transition-colors">Finish</button>
                    </div>
                     <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {colors.map(color => (
                            <button key={color} onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }} className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${selectedColor === color ? 'border-accent ring-2 ring-accent' : 'border-white/50'}`} aria-label={`Select color ${color}`} />
                        ))}
                    </div>
                    <div className="w-full max-w-sm p-2 bg-white/30 rounded-lg shadow-inner">
                        <selectedTemplate.Component pathColors={pathColors} onPathClick={handlePathClick} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColoringGame;