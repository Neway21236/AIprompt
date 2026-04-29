import { motion } from 'framer-motion';
import { Mail, Globe, MessageSquare, Send } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 border-t border-slate-900/50">
      <div className="glass max-w-4xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have a prompt <br /> 
              <span className="text-transparent bg-clip-text accent-gradient">suggestion?</span>
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We're always looking for new engineered prompts to add to our library. 
              Drop us a message or follow our updates on social media.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:hello@promptlib.io" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@promptlib.io</span>
              </a>
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-primary/30 hover:bg-primary/10 transition-all">
                  <MessageSquare className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-primary/30 hover:bg-primary/10 transition-all">
                  <Globe className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Message</label>
              <textarea 
                placeholder="Tell us about your prompt idea..."
                rows="4"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
              ></textarea>
            </div>
            <button className="w-full accent-gradient py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
