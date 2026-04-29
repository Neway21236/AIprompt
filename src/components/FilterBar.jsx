import { motion } from 'framer-motion';

const categories = [
  'All',
  'Software Development',
  'Video Editing',
  'Graphic Design',
  'Image Generation',
  'Content Creation',
];

export const FilterBar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            selectedCategory === category
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          {selectedCategory === category && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
};
