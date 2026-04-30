import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, Play, Trash2, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PromptDetailModal } from './PromptDetailModal';

export const PromptCard = ({ prompt, onCopy, onDelete, isAdmin }) => {
  const [copied, setCopied] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem(`prompt_likes_${prompt.id}`);
    const savedLiked = localStorage.getItem(`prompt_liked_${prompt.id}`);
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedLiked) setIsLiked(savedLiked === 'true');
  }, [prompt.id]);

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

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLikeAnimating(true);
    const newLiked = !isLiked;
    const newLikes = newLiked ? likes + 1 : Math.max(0, likes - 1);
    setIsLiked(newLiked);
    setLikes(newLikes);
    localStorage.setItem(`prompt_likes_${prompt.id}`, newLikes.toString());
    localStorage.setItem(`prompt_liked_${prompt.id}`, newLiked.toString());
    setTimeout(() => setIsLikeAnimating(false), 400);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (prompt.category === 'Image Generation' && prompt.sampleImage) {
      setIsFullImageOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeFullImage = () => {
    setIsFullImageOpen(false);
    document.body.style.overflow = '';
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullImageOpen) {
        closeFullImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullImageOpen]);

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
          <div 
            className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 cursor-zoom-in group/image"
            onClick={handleImageClick}
          >
            <img 
              src={prompt.sampleImage} 
              alt={prompt.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950/90 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-center gap-2 text-white text-xs font-medium">
                <ExternalLink className="w-4 h-4" />
                <span>View Full Size</span>
              </div>
            </div>
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
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.85 }}
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-lg border transition-all duration-200 ${
              isLiked 
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400' 
                : 'text-slate-400 hover:text-rose-400 bg-slate-800/30 hover:bg-slate-800/60 border-slate-700/30 hover:border-rose-500/30'
            }`}
          >
            <motion.span
              animate={isLikeAnimating ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
            </motion.span>
            <span className="min-w-[2ch]">{likes > 0 ? likes : ''}</span>
          </motion.button>
          
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

      {/* Full Size Image Lightbox */}
      <AnimatePresence>
        {isFullImageOpen && prompt.sampleImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeFullImage}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/98 backdrop-blur-md"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeFullImage}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/50"
            >
              <ExternalLink className="w-5 h-5 rotate-90" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[90vh] w-full"
            >
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                <img 
                  src={prompt.sampleImage} 
                  alt={prompt.title} 
                  className="w-full h-full object-contain max-h-[80vh]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <h3 className="text-lg font-semibold text-white">{prompt.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">Press ESC or click outside to close</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
