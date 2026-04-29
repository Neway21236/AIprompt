import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook, Youtube, X, MessageCircle, Send } from 'lucide-react';

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
              <a href="mailto:newaytty@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Mail className="w-5 h-5" />
                </div>
                <span>newaytty@gmail.com</span>
              </a>
              
              <div className="space-y-3 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Follow Us</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group" title="Instagram">
                    <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-500" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all group" title="Facebook">
                    <Facebook className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-red-600/50 hover:bg-red-600/10 transition-all group" title="Youtube">
                    <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-green-500/50 hover:bg-green-500/10 transition-all group" title="Whatsapp">
                    <MessageCircle className="w-5 h-5 text-slate-400 group-hover:text-green-500" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50 hover:border-white/50 hover:bg-white/10 transition-all group" title="X (Twitter)">
                    <X className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </a>
                </div>
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
