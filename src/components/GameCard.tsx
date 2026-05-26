import React from "react";
import { motion } from "motion/react";
import { Game } from "../data/games";

interface GameCardProps {
  game: Game;
  index: number;
  onClick: (id: string) => void;
}

function PunctuationText({ text }: { text: string }) {
  // Split text by punctuation to wrap them in spans
  const parts = text.split(/([，。、！：？])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/[，。、！：？]/.test(part)) {
          return (
            <span key={i} className="font-sans text-[0.6em] align-baseline mx-[2px] opacity-60">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const GameCard: React.FC<GameCardProps> = ({ game, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onClick={() => onClick(game.id)}
    >
      <div className="absolute inset-0 bg-transparent transition-opacity duration-700" />
      <motion.div 
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="relative flex flex-col h-full bg-transparent border-t border-white/20 pt-8 transition-all duration-700 group-hover:border-white/50 px-2"
      >
        <div className="flex items-start justify-between mb-10 text-white">
            <motion.div 
                className="opacity-80 group-hover:opacity-100 transition-all duration-500 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <game.icon size={26} className="stroke-[1.2]" />
                <motion.div 
                  className="absolute top-0 -right-2 w-1.5 h-1.5 bg-white/50 rounded-full"
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                />
            </motion.div>
            <motion.div className="flex items-center space-x-4">
              <span className="text-[11px] opacity-40 font-serif italic tracking-widest">No. 0{index + 1}</span>
              <div className="w-2 h-2 rounded-full border border-white/30 group-hover:bg-white transition-colors"></div>
            </motion.div>
        </div>
        
        <div className="relative z-10 flex-grow text-left flex flex-col space-y-6">
            <div>
               <h3 className="text-sm md:text-base font-serif italic text-white/80 mb-2 truncate opacity-90">{game.subtitle}</h3>
               <h4 className="text-xl md:text-2xl font-serif font-light tracking-[0.15em] text-white whitespace-nowrap">{game.title}</h4>
            </div>
            <p className="text-[11px] md:text-xs opacity-70 leading-[2.2] tracking-[0.15em] font-light text-white max-w-[95%]">
               <PunctuationText text={game.description} />
            </p>
        </div>

        <motion.div 
            className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0, 0.2, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
