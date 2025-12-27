
import React from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  name: string;
  onNext: () => void;
}

const RECENT_ACTIVITY = [
  { user: "Dad", action: "paid", amount: "500 Gems", time: "2m ago" },
  { user: "Mom", action: "ordered", amount: "Dessert", time: "5m ago" },
  { user: "Cousin Ria", action: "sent", amount: "100 Coins", time: "12m ago" }
];

const Welcome: React.FC<Props> = ({ name, onNext }) => {
  const handleStart = () => {
    playTap();
    onNext();
  };

  return (
    <div className="h-full flex flex-col py-2">
      <div className="flex flex-col items-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-[2rem] flex items-center justify-center text-white text-3xl shadow-2xl shadow-rose-200 rotate-6">
            🎂
          </div>
        </motion.div>
        
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2 font-display leading-tight">
            Welcome back, {name}!
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Guest ID: #ARU-2024-{name.length}00</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {/* Wallet Balance Card */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-rose-500/30 transition-colors"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Fictional Wealth</p>
              <h3 className="text-3xl font-black font-display mt-1">12,500 <span className="text-rose-400">💎</span></h3>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-bold uppercase tracking-widest">
              Premium Guest
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
              <p className="text-[8px] font-bold uppercase text-slate-500 tracking-widest">Points</p>
              <p className="font-black text-sm">4.2k ✨</p>
            </div>
            <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5">
              <p className="text-[8px] font-bold uppercase text-slate-500 tracking-widest">Credits</p>
              <p className="font-black text-sm">850 🎫</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <div className="px-2">
          <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Live House Feed</h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">👤</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800"><span className="text-rose-500">{activity.user}</span> {activity.action}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activity.time}</p>
                  </div>
                </div>
                <p className="text-[10px] font-black text-slate-900">{activity.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="group w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3"
        >
          <span>Start Ordering</span>
          <motion.svg 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Welcome;
