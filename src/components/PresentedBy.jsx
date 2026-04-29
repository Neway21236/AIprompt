import { motion } from 'framer-motion';

export const PresentedBy = () => {
  return (
    <footer className="py-12 border-t border-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">Curated By</span>
            <div className="h-px w-12 bg-slate-800" />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-accent p-0.5 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-bold text-white">N</span>
              </div>
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">Newaytty</h4>
              <p className="text-slate-500 text-xs font-medium">Crafting the Future of AI</p>
            </div>
          </motion.div>

          <div className="pt-8 flex flex-col md:flex-row items-center gap-4 text-slate-600 text-xs">
            <p>&copy; 2024 AI Prompt Library. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-800" />
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
