import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 text-xs font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Curated by AI Engineers & Creatives</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">Fuel Your Creativity with</span>
          <br />
          <span className="text-transparent bg-clip-text accent-gradient">Engineered Prompts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10"
        >
          Explore a premium library of high-performance AI prompts tailored for developers, 
          designers, and content creators. Copy, paste, and create.
        </motion.p>
      </div>
    </section>
  );
};
