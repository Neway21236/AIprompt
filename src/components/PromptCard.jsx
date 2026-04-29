import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Play, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PromptDetailModal } from './PromptDetailModal';

export const PromptCard = ({ prompt, onCopy, onDelete, isAdmin }) => {
  const [copied, setCopied] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsDetailModalOpen(true)}
        className="glass glass-hover p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
      >
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            {prompt.category}
          </span>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="Delete Prompt"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            {prompt.category === 'Image Generation' && prompt.sampleImage && (
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                <ExternalLink className="w-3 h-3" />
              </div>
            )}
            {prompt.category === 'Video Editing' && prompt.sampleVideo && (
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                <Play className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        {/* Media Preview (Optional) */}
        {prompt.category === 'Image Generation' && prompt.sampleImage && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
            <img 
              src={prompt.sampleImage} 
              alt={prompt.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
            {prompt.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {prompt.preview}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-700/50"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setIsDetailModalOpen(true)}
            className="flex items-center gap-2 text-xs font-medium text-primary hover:text-white transition-colors bg-primary/10 hover:bg-primary px-4 py-2.5 rounded-lg border border-primary/20"
          >
            <span>See More</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Subtle Glow Effect on Hover */}
        <div className="absolute -inset-x-20 -top-20 h-40 w-40 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-colors pointer-events-none" />
      </motion.div>

      <PromptDetailModal 
        prompt={prompt} 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        onCopy={onCopy}
      />
    </>
  );
};
