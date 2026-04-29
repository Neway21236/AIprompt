import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const PromptDetailModal = ({ prompt, isOpen, onClose, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    onCopy();
    setTimeout(() => setCopied(false), 2000);
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
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {prompt.category}
              </span>
              <h2 className="text-xl font-bold text-white">{prompt.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
            {/* Sample Media */}
            {(prompt.category === 'Image Generation' && prompt.sampleImage) && (
              <div className="rounded-2xl overflow-hidden border border-slate-800">
                <img 
                  src={prompt.sampleImage} 
                  alt={prompt.title} 
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            {(prompt.category === 'Video Editing' && prompt.sampleVideo) && (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black">
                <video 
                  src={prompt.sampleVideo} 
                  controls 
                  className="w-full aspect-video object-contain"
                />
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Full Prompt</h4>
              <div className="relative group">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {prompt.prompt}
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-slate-700"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {prompt.preview && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Description</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {prompt.preview}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Full Prompt</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
