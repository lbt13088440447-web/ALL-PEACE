import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Background } from "./components/Background";
import { GameCard } from "./components/GameCard";
import { GAMES } from "./data/games";
import { X } from "lucide-react";

export default function App() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <>
      <Background />
      <div className="min-h-screen font-sans text-white selection:bg-indigo-500/30 flex flex-col relative z-0">
        
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 inset-x-0 h-20 md:h-24 flex items-center justify-between px-6 md:px-12 z-50 pointer-events-none"
        >
            <div className="flex items-center space-x-2 pointer-events-auto">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/40 flex items-center justify-center">
                <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
              </div>
              <span className="tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold text-white">正念空间</span>
            </div>
            {activeGame ? (
              <button 
                onClick={() => setActiveGame(null)} 
                className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                 <X size={20} />
              </button>
            ) : (
              <div className="flex space-x-8 md:space-x-12 text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity pointer-events-auto hidden sm:flex">
                  <a href="#" className="hover:text-white transition-colors">目录</a>
                  <a href="#" className="hover:text-white transition-colors">关于</a>
              </div>
            )}
        </motion.nav>

        {!activeGame && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1"
          >
            <header className="pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center text-center mt-8 md:mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                    <div className="flex items-center gap-3 md:gap-4 mb-6">
                       <motion.div 
                         animate={{ rotate: 360 }} 
                         transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                         className="w-5 h-5 md:w-6 h-6 md:h-6 rounded-full border border-white/20 border-t-white/80 opacity-80"
                       />
                       <span className="uppercase tracking-[0.4em] text-[9px] md:text-[10px] opacity-50">体验馆</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-serif font-light mb-8 md:mb-10 leading-[1.4] md:leading-[1.3] max-w-4xl tracking-widest text-center mt-4">
                        <span className="block italic opacity-90 mb-4 tracking-[0.05em] text-[#E8E8E8]">Find calm in the micro moments<span className="font-sans text-[0.6em] opacity-40 align-baseline ml-1">.</span></span>
                        <span className="block tracking-[0.15em] mt-6 opacity-80 text-2xl md:text-4xl text-white">在微小的瞬间<span className="font-sans text-[0.5em] opacity-40 align-baseline mx-0.5">，</span>找到内心的平静<span className="font-sans text-[0.5em] opacity-40 align-baseline ml-0.5">。</span></span>
                    </h1>
                    <p className="text-[11px] md:text-[13px] tracking-[0.2em] md:tracking-[0.25em] uppercase opacity-70 max-w-2xl leading-[2.2] mt-4 font-light">
                        一个探索感官的互动体验集<span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">，</span>通过视觉<span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">、</span>听觉与触觉<span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">，</span>帮助您沉淀思绪<span className="font-sans text-[0.6em] align-baseline ml-0.5 opacity-60">。</span>
                    </p>
                </motion.div>
            </header>

            <main className="flex-1 px-6 md:px-12 pb-24 md:pb-32 pt-8 md:pt-12 max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {GAMES.map((game, index) => (
                        <GameCard 
                          key={game.id} 
                          game={game} 
                          index={index} 
                          onClick={(id) => {
                            if (id === 'vibration') {
                              window.open('https://jolly-mousse-61b857.netlify.app', '_blank', 'noreferrer,noopener') || (window.location.href = 'https://jolly-mousse-61b857.netlify.app');
                            } else if (id === 'audio') {
                              window.open('https://zenmix66.netlify.app/', '_blank', 'noreferrer,noopener') || (window.location.href = 'https://zenmix66.netlify.app/');
                            } else if (id === 'vision') {
                              window.open('https://blink66.netlify.app', '_blank', 'noreferrer,noopener') || (window.location.href = 'https://blink66.netlify.app');
                            } else {
                              setActiveGame(id);
                            }
                          }}  
                        />
                    ))}
                </div>
            </main>
          </motion.div>
        )}

        {/* Active game renders can go here if any remain */}
        <AnimatePresence>
        </AnimatePresence>

      </div>
    </>
  );
}
