import { useState, useMemo, useEffect } from 'react';
import { Search, Command, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PromptCard } from './components/PromptCard';
import { Toast } from './components/Toast';
import { ContactSection } from './components/ContactSection';
import { PresentedBy } from './components/PresentedBy';
import { AddPromptModal } from './components/AddPromptModal';
import promptData from './data/prompts.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showToast, setShowToast] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userPrompts, setUserPrompts] = useState(() => {
    const saved = localStorage.getItem('user_prompts');
    return saved ? JSON.parse(saved) : [];
  });
  const [deletedPromptIds, setDeletedPromptIds] = useState(() => {
    const saved = localStorage.getItem('deleted_prompt_ids');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const initialPrompts = useMemo(() => 
    Array.isArray(promptData) ? promptData : promptData.default || []
  , []);

  const allPrompts = useMemo(() => {
    const combined = [...initialPrompts, ...userPrompts];
    return combined.filter(p => !deletedPromptIds.includes(p.id));
  }, [initialPrompts, userPrompts, deletedPromptIds]);

  useEffect(() => {
    localStorage.setItem('user_prompts', JSON.stringify(userPrompts));
  }, [userPrompts]);

  useEffect(() => {
    localStorage.setItem('deleted_prompt_ids', JSON.stringify(deletedPromptIds));
  }, [deletedPromptIds]);

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.preview.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || prompt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allPrompts, searchTerm, selectedCategory]);

  const handleCopy = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddPrompt = (newPrompt) => {
    setUserPrompts([...userPrompts, newPrompt]);
  };

  const handleDeletePrompt = (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      setDeletedPromptIds([...deletedPromptIds, id]);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Search & Filter Section */}
      <div className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group mb-6">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search prompts by keyword..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-16 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-500 text-[10px] font-bold">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <FilterBar 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            {isAdmin && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-bold hover:bg-primary hover:text-white transition-all active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add New Prompt
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="text-slate-300 font-medium">{filteredPrompts.length}</span> prompts
          </p>
        </div>

        {/* Prompt Grid */}
        <motion.div 
          layout
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onCopy={handleCopy} 
                onDelete={() => handleDeletePrompt(prompt.id)}
                isAdmin={isAdmin}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-500 text-lg">No prompts found matching your criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      <ContactSection />
      
      <PresentedBy />

      <AddPromptModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddPrompt} 
      />

      <Toast 
        message="Prompt copied to clipboard!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}

export default App;
