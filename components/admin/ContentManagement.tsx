import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { resources as initialResources } from '../../data/resources';
import { Resource, Language } from '../../types';

const ContentManagement: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [language] = useState<Language>('en');

  const handleDelete = (id: string) => {
    // In a real app, this would be an API call.
    // Here we just filter the state for demonstration.
    if(window.confirm('Are you sure you want to delete this resource?')){
        setResources(resources.filter(r => r.id !== id));
        console.log(`Deleted resource with id: ${id}`);
    }
  };
  
  const handleEdit = (id: string) => {
      alert(`Editing resource with ID: ${id}. (Feature in development)`);
      console.log(`Editing resource with id: ${id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Content Management</h1>
      <p className="text-text-muted mb-8">Add, edit, or remove resources, games, and other platform content.</p>
      
      <GlassCard>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-text-heading">Resource Hub Articles</h2>
            <button className="bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
                Add New Article
            </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-body">
            <thead className="text-xs text-text-heading uppercase bg-white/40">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <tr key={resource.id} className="border-b border-white/30 hover:bg-white/30">
                  <td className="px-6 py-4 font-medium text-text-heading">
                    {resource.content[language]?.title || resource.content['en'].title}
                  </td>
                  <td className="px-6 py-4">{resource.category}</td>
                  <td className="px-6 py-4 space-x-2">
                     <button onClick={() => handleEdit(resource.id)} className="text-xs font-medium px-3 py-1 rounded-full text-blue-700 hover:bg-blue-200">Edit</button>
                    <button onClick={() => handleDelete(resource.id)} className="text-xs font-medium px-3 py-1 rounded-full text-red-700 hover:bg-red-200">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default ContentManagement;