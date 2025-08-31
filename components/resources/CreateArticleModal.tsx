import React, { useState, useRef } from 'react';
import GlassCard from '../common/GlassCard';
import { Article } from '../../types';
import { XIcon, BoldIcon, ItalicIcon, ListIcon } from '../common/Icons';

interface CreateArticleModalProps {
  onClose: () => void;
  onPublish: (articleData: Omit<Article, 'id' | 'userId' | 'publishDate'>) => void;
  userName: string;
  isInitiallyAnonymous: boolean;
}

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ onClose, onPublish, userName, isInitiallyAnonymous }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(isInitiallyAnonymous);
  const [error, setError] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const handlePublish = () => {
    if (!title.trim() || !editorRef.current?.innerHTML.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }
    setError('');
    
    const articleData = {
      title,
      content: editorRef.current.innerHTML,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: isAnonymous ? 'Anonymous' : userName,
      isAnonymous: isAnonymous,
    };
    onPublish(articleData);
  };
  
  const handleFormat = (command: string) => {
      document.execCommand(command, false, undefined);
      editorRef.current?.focus();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <GlassCard className="w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-heading">Create New Article</h2>
          <button onClick={onClose}><XIcon/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          <input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <div>
            <div className="flex items-center gap-2 p-2 bg-white/40 rounded-t-lg border-b border-white/60">
                <button onClick={() => handleFormat('bold')} className="p-2 rounded hover:bg-white/60"><BoldIcon /></button>
                <button onClick={() => handleFormat('italic')} className="p-2 rounded hover:bg-white/60"><ItalicIcon /></button>
                <button onClick={() => handleFormat('insertUnorderedList')} className="p-2 rounded hover:bg-white/60"><ListIcon /></button>
            </div>
            <div
              ref={editorRef}
              contentEditable={true}
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              className="w-full p-3 h-48 bg-white/80 rounded-b-lg text-text-body focus:outline-none focus:ring-2 focus:ring-accent overflow-y-auto prose max-w-none"
              aria-label="Article content"
            ></div>
          </div>
          
          <input
            type="text"
            placeholder="Tags (comma-separated, e.g., Anxiety, Self-care)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="anonymous-post" 
              checked={isAnonymous} 
              onChange={(e) => setIsAnonymous(e.target.checked)} 
              className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent"
            />
            <label htmlFor="anonymous-post" className="text-sm text-text-body">Post Anonymously</label>
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        
        <div className="flex justify-end space-x-4 mt-4 pt-4 border-t border-white/30">
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
          <button type="button" onClick={handlePublish} className="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">Publish</button>
        </div>
      </GlassCard>
    </div>
  );
};

export default CreateArticleModal;
