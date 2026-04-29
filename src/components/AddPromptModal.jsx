import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Image as ImageIcon, Video as VideoIcon, Type, AlignLeft, Tag } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = [
  "Software Development",
  "Video Editing",
  "Graphic Design",
  "Image Generation",
  "Content Creation"
];

export const AddPromptModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    preview: '',
    prompt: '',
    sampleImage: '',
    sampleVideo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Date.now(), // Simple unique ID
    });
    setFormData({
      title: '',
      category: CATEGORIES[0],
      preview: '',
      prompt: '',
      sampleImage: '',
      sampleVideo: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Prompt
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Type className="w-3.5 h-3.5" />
                Prompt Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g., Cyberpunk Character Concept"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Category
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft className="w-3.5 h-3.5" />
                Short Preview
              </label>
              <textarea
                required
                rows={2}
                placeholder="A brief description of what this prompt does..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                value={formData.preview}
                onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft className="w-3.5 h-3.5" />
                Full Prompt
              </label>
              <textarea
                required
                rows={4}
                placeholder="Paste the full prompt here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              />
            </div>

            {formData.category === 'Image Generation' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Sample Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  value={formData.sampleImage}
                  onChange={(e) => setFormData({ ...formData, sampleImage: e.target.value })}
                />
              </div>
            )}

            {formData.category === 'Video Editing' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <VideoIcon className="w-3.5 h-3.5" />
                  Sample Video URL
                </label>
                <input
                  type="url"
                  placeholder="https://sample-videos.com/video.mp4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  value={formData.sampleVideo}
                  onChange={(e) => setFormData({ ...formData, sampleVideo: e.target.value })}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20"
            >
              <Plus className="w-5 h-5" />
              Add Prompt to Library
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
