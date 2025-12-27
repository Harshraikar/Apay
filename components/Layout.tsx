
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  isProcessing?: boolean;
  progress: number;
  title?: string;
}

const EXCHANGE_RATES = [
  "💎 GEMS: 1.25 CRD 🔼",
  "🎫 CREDITS: 0.80 PTS 🔽",
  "✨ POINTS: 2.50 COI 🔼",
  "🪙 COINS: 0.10 GMS ⏺",
  "🎂 ARUSHI INDEX: ALL TIME HIGH 🚀"
];

const Layout: React.FC<LayoutProps> = ({ children, isProcessing, progress, title }) => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 selection:bg-rose-100">
      <div className="w-full max-w-[414px] bg-white rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border-[12px] border-slate-900 relative aspect-[9/19.5] flex flex-col">
        
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 pt-3">
          <motion.div 
            animate={{ 
              width: isProcessing || title ? 220 : 120,
              height: isProcessing ? 36 : 30,
              borderRadius: 24,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-slate-900 flex items-center justify-center overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div 
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3 px-4"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Verifying...</span>
                </motion.div>
              ) : title && title !== 'General' ? (
                <motion.div 
                  key="title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 px-4"
                >
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest whitespace-nowrap">Ordered: {title}</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-10 h-1 bg-slate-800 rounded-full" 
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Status Bar */}
        <div className="h-14 px-10 flex justify-between items-end pb-2 z-20 text-slate-900">
          <span className="text-[13px] font-extrabold">9:41</span>
          <div className="flex space-x-2 items-center mb-0.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <div className="w-6 h-3 border-2 border-current rounded-[4px] flex items-center px-0.5 relative">
              <div className="bg-current h-1.5 w-[85%] rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-4 pb-12 flex flex-col">
          {children}
        </div>

        {/* Footer Exchange Ticker */}
        <div className="h-10 bg-slate-50 border-t border-slate-100 flex items-center overflow-hidden whitespace-nowrap">
           <motion.div 
             animate={{ x: [0, -1000] }}
             transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
             className="flex space-x-12 px-4"
           >
             {[...EXCHANGE_RATES, ...EXCHANGE_RATES, ...EXCHANGE_RATES].map((rate, i) => (
               <span key={i} className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                 {rate}
               </span>
             ))}
           </motion.div>
        </div>

        {/* Home Indicator */}
        <div className="h-8 flex items-center justify-center">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
