import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Background } from "./components/Background";
import { GameCard } from "./components/GameCard";
import { GAMES } from "./data/games";
import { X, ChevronRight } from "lucide-react";

export default function App() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <Background />
      <div className="min-h-screen font-sans text-white selection:bg-indigo-500/30 flex flex-col relative z-0">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 inset-x-0 pt-[env(safe-area-inset-top)] h-20 md:h-24 flex items-center justify-between pl-[max(2rem,env(safe-area-inset-left))] pr-[max(2rem,env(safe-area-inset-right))] md:px-16 z-50 pointer-events-none"
        >
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
            </div>
            <span className="tracking-[0.3em] text-[10px] md:text-xs uppercase font-semibold text-white">
              正念空间
            </span>
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
              <a href="#" className="hover:text-white transition-colors">
                目录
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsAboutOpen(true);
                }}
                className="hover:text-white transition-colors"
              >
                关于
              </button>
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
            <header className="pt-28 md:pt-32 pb-12 md:pb-16 pl-[max(2.5rem,env(safe-area-inset-left))] pr-[max(2.5rem,env(safe-area-inset-right))] md:px-16 max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center text-center mt-8 md:mt-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 md:w-6 h-6 md:h-6 rounded-full border border-white/20 border-t-white/80 opacity-80"
                  />
                  <span className="uppercase tracking-[0.4em] text-[9px] md:text-[10px] opacity-50">
                    体验馆
                  </span>
                </div>
                <div className="flex flex-col items-start text-left max-w-3xl mx-auto mb-12 md:mb-16 mt-8 w-full px-2 md:px-0">
                  <h1 className="font-serif font-normal tracking-[0.05em] md:tracking-[0.1em] text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[4rem] text-white leading-tight whitespace-nowrap">
                    <span className="block text-[#E8E8E8]">
                      在微小的瞬间
                      <span className="font-sans text-[0.5em] opacity-60 align-baseline mx-0.5">
                        ，
                      </span>
                    </span>
                    <span className="block text-[#E8E8E8] ml-[10%] mt-2 md:mt-4">
                      找到内心的平静
                    </span>
                  </h1>
                  <h2 className="font-serif italic font-light tracking-[0.05em] text-[1rem] sm:text-xl md:text-2xl lg:text-[2.25rem] text-white/50 leading-tight mt-4 md:mt-6 self-end text-right mr-[15%] whitespace-nowrap">
                    <span className="block">In Tiny Moments,</span>
                    <span className="block mt-1 md:mt-2">Find Inner Peace</span>
                  </h2>
                </div>
                <p className="text-[11px] md:text-[13px] tracking-[0.2em] md:tracking-[0.25em] uppercase opacity-70 max-w-2xl text-center leading-[2.2] mt-8 font-light">
                  一个探索感官的互动体验集
                  <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                    ，
                  </span>
                  通过视觉
                  <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                    、
                  </span>
                  听觉与触觉
                  <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                    ，
                  </span>
                  帮助您沉淀思绪
                  <span className="font-sans text-[0.6em] align-baseline ml-0.5 opacity-60">
                    。
                  </span>
                </p>
              </motion.div>
            </header>

            <main className="flex-1 pl-[max(2.5rem,env(safe-area-inset-left))] pr-[max(2.5rem,env(safe-area-inset-right))] md:px-16 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-8 md:pt-12 max-w-5xl mx-auto w-full relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {GAMES.map((game, index) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    index={index}
                    onClick={(id) => {
                      if (id === "vibration") {
                        window.open(
                          "https://inandoutlv.netlify.app",
                          "_blank",
                          "noreferrer,noopener",
                        ) ||
                          (window.location.href =
                            "https://inandoutlv.netlify.app");
                      } else if (id === "audio") {
                        window.open(
                          "https://zennmix.netlify.app/",
                          "_blank",
                          "noreferrer,noopener",
                        ) ||
                          (window.location.href =
                            "https://zennmix.netlify.app/");
                      } else if (id === "vision") {
                        window.open(
                          "https://chic-cascaron-566930.netlify.app",
                          "_blank",
                          "noreferrer,noopener",
                        ) ||
                          (window.location.href =
                            "https://chic-cascaron-566930.netlify.app");
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

        {/* Edge Swipe Hint */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 0.6, 0], x: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
          className="fixed left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-40 mix-blend-screen"
        >
          <div className="w-1 h-32 md:h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"></div>
          <ChevronRight size={14} className="text-white/30 ml-2" />
          <span className="text-[9px] tracking-[0.3em] text-white/30 ml-1 opacity-70" style={{ writingMode: 'vertical-rl' }}>
            边缘滑动返回
          </span>
        </motion.div>

        {/* Active game renders can go here if any remain */}
        <AnimatePresence>
          {isAboutOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md pointer-events-auto"
              onClick={() => setIsAboutOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-14 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/2 translate-y-1/2" />

                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                  <X size={18} className="opacity-70" />
                </button>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif font-light tracking-[0.15em] mb-8 text-[#E8E8E8]">
                    关于项目
                  </h3>
                  <div className="space-y-6 text-[13px] md:text-sm font-light tracking-[0.1em] md:tracking-[0.15em] leading-[2.2] opacity-70">
                    <p>
                      「正念空间」是一个探索数字感官与内心平静的互动实验项目
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        。
                      </span>
                    </p>
                    <p>
                      在这个充满噪音与加速的时代
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        ，
                      </span>
                      我们往往忽略了身体最细微的感受
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        。
                      </span>
                      本项目通过视觉的呼吸
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        、
                      </span>
                      听觉的共鸣
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        ，
                      </span>
                      以及触觉的沉浸交互
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        ，
                      </span>
                      试图创造一个能在微小的瞬间让人停下脚步的数字庇护所
                      <span className="font-sans text-[0.6em] align-baseline ml-0.5 opacity-60">
                        。
                      </span>
                    </p>
                    <p>
                      通过这些简单的互动
                      <span className="font-sans text-[0.6em] align-baseline mx-0.5 opacity-60">
                        ，
                      </span>
                      希望能帮助您在繁忙中找回片刻的专注与宁静
                      <span className="font-sans text-[0.6em] align-baseline ml-0.5 opacity-60">
                        。
                      </span>
                    </p>
                  </div>
                  <div className="pt-10 mt-10 border-t border-white/10 flex flex-col items-center">
                    <span className="text-[9px] tracking-[0.3em] opacity-40 uppercase">
                      Mindful Space Project
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
