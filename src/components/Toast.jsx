import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const Toast = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="glass px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border-primary/20">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-white">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
