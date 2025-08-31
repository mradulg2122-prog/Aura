import React, { useState, useMemo, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { type Article, type Game } from '../../types';
import { initialArticles } from '../../data/articles';
import CreateArticleModal from './CreateArticleModal';
import { LungsIcon, PaletteIcon, PuzzleIcon, SparklesIcon, SoundWaveIcon, SearchIcon, XIcon } from '../common/Icons';

// Game Components
import GameModal from '../games/GameModal';
import BreathingGame from '../games/BreathingGame';
import ColoringGame from '../games/ColoringGame';
import JigsawPuzzle from '../games/JigsawPuzzle';
import MemoryMatch from '../games/MemoryMatch';
import SoundMixer from '../games/SoundMixer';

const games: Game[] = [
  { id: 'breathing', title: 'Mindful Breathing', description: 'Relax with a guided breathing exercise.', Icon: LungsIcon, Component: BreathingGame },
  { id: 'dhvani', title: 'Dhvani: Sound Therapy', description: 'Calm your mind with Indian melodies.', Icon: SoundWaveIcon, Component: SoundMixer },
  { id: 'coloring', title: 'Mandala Coloring', description: 'Unleash your creativity and find focus.', Icon: PaletteIcon, Component: ColoringGame },
  { id: 'jigsaw', title: 'Puzzle Relaxer', description: 'Piece together a peaceful nature scene.', Icon: PuzzleIcon, Component: JigsawPuzzle },
  { id: 'memory', title: 'Memory Match', description: 'A calm challenge to sharpen your mind.', Icon: SparklesIcon, Component: MemoryMatch },
];

// Mock current user ID, in a real app this would come from an auth context
const MOCK_USER_ID = 'user_1';

interface ResourcesProps {
    userName: string;
    isAnonymous: boolean;
}

const Resources: React.FC<ResourcesProps> = ({ userName, isAnonymous }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'games'>('articles');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const storedArticles = localStorage.getItem('aura-articles');
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      } else {
        // Seed initial data if local storage is empty
        localStorage.setItem('aura-articles', JSON.stringify(initialArticles));
        setArticles(initialArticles);
      }
    } catch (error) {
      console.error("Failed to load or seed articles:", error);
      localStorage.setItem('aura-articles', JSON.stringify(initialArticles));
      setArticles(initialArticles);
    }
  }, []);
  
  const updateAndStoreArticles = (newArticles: Article[]) => {
    const sortedArticles = newArticles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    setArticles(sortedArticles);
    localStorage.setItem('aura-articles', JSON.stringify(sortedArticles));
  };
  
  const handlePublishArticle = (articleData: Omit<Article, 'id' | 'userId' | 'publishDate'>) => {
      const newArticle: Article = {
          ...articleData,
          id: `article_${Date.now()}`,
          userId: MOCK_USER_ID,
          publishDate: new Date().toISOString(),
      };
      updateAndStoreArticles([newArticle, ...articles]);
      setShowCreateModal(false);
  };
  
  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const lowercasedQuery = searchQuery.toLowerCase();
    
    // Create a temporary div to strip HTML for content search
    const tempDiv = document.createElement('div');

    return articles.filter(article => {
        tempDiv.innerHTML = article.content;
        const plainContent = tempDiv.textContent || tempDiv.innerText || "";
        
        return (
            article.title.toLowerCase().includes(lowercasedQuery) ||
            plainContent.toLowerCase().includes(lowercasedQuery) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
        );
    });
  }, [articles, searchQuery]);


  const TabButton: React.FC<{tab: 'articles' | 'games', label: string}> = ({ tab, label }) => (
    <button 
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === tab ? 'bg-accent text-white shadow-md' : 'bg-white/40 text-text-body hover:bg-white/60'}`}
    >
        {label}
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Resource Hub</h1>
      <p className="text-text-muted mb-8">Tools and content to support your well-being.</p>
      
      <div className="mb-8 flex justify-center gap-4 p-1 bg-white/30 rounded-full">
        <TabButton tab="articles" label="Articles" />
        <TabButton tab="games" label="Calming Games" />
      </div>

      {activeTab === 'articles' ? (
        <div className="animate-fade-in">
          <GlassCard className="mb-8 !p-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-auto flex-grow">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent border border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-text-muted" />
                    </div>
                </div>
                <button 
                    onClick={() => setShowCreateModal(true)} 
                    className="w-full sm:w-auto flex-shrink-0 bg-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Create Article
                </button>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <GlassCard key={article.id} className="cursor-pointer hover:scale-105 flex flex-col" onClick={() => setSelectedArticle(article)}>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-text-heading mb-2">{article.title}</h3>
                  <p className="text-xs text-text-muted mb-3">By {article.author} &bull; {new Date(article.publishDate).toLocaleDateString()}</p>
                   {/* This is a simple way to get a summary */}
                  <p className="text-text-body text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: article.content }}></p>
                </div>
                <div className="mt-4 pt-2 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-accent-light text-accent py-1 px-3 rounded-full">{tag}</span>
                  ))}
                </div>
              </GlassCard>
            ))}
             {filteredArticles.length === 0 && (
                <div className="md:col-span-2 lg:col-span-3 text-center py-10">
                    <p className="font-semibold text-text-body">No articles found.</p>
                    <p className="text-sm text-text-muted">Try a different search or create a new article!</p>
                </div>
            )}
          </div>
        </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {games.map(game => (
                <GlassCard key={game.id} className="cursor-pointer hover:scale-105 flex flex-col items-center text-center" onClick={() => setActiveGame(game)}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-primary-light to-bg-end">
                      <game.Icon className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-text-heading mb-2">{game.title}</h3>
                    <p className="text-text-body text-sm">{game.description}</p>
                </GlassCard>
            ))}
         </div>
      )}

      {/* Modal for displaying full article */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={() => setSelectedArticle(null)}>
            <GlassCard className="w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-text-heading mb-2">{selectedArticle.title}</h2>
                        <p className="text-sm text-text-muted">By {selectedArticle.author} on {new Date(selectedArticle.publishDate).toLocaleDateString()}</p>
                         <div className="mt-2 flex flex-wrap gap-2">
                          {selectedArticle.tags.map(tag => (
                            <span key={tag} className="text-xs font-semibold bg-accent-light text-accent py-1 px-3 rounded-full">{tag}</span>
                          ))}
                        </div>
                    </div>
                    <button onClick={() => setSelectedArticle(null)} className="text-text-muted hover:text-text-heading p-1 -mt-2 -mr-2"><XIcon/></button>
                </div>
                <div className="mt-4 text-text-body prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </GlassCard>
        </div>
      )}

      {/* Modal for creating article */}
      {showCreateModal && (
        <CreateArticleModal 
          onClose={() => setShowCreateModal(false)}
          onPublish={handlePublishArticle}
          userName={userName}
          isInitiallyAnonymous={isAnonymous}
        />
      )}

      {/* Modal for games */}
      <GameModal 
        isOpen={!!activeGame} 
        onClose={() => setActiveGame(null)} 
        title={activeGame?.title || ''}
      >
        {activeGame && <activeGame.Component />}
      </GameModal>
    </div>
  );
};

export default Resources;