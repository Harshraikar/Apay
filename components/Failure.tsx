
import React from 'react';
import { UserData } from '../types';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  userData: UserData;
  onReset: () => void;
}

const Failure: React.FC<Props> = ({ userData, onReset }) => {
  const handleReset = () => {
    playTap();
    onReset();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
        className="w-24 h-24 bg-rose-100 rounded-[2.2rem] flex items-center justify-center mb-8 shadow-2xl shadow-rose-100"
      >
        <motion.div
          animate={{ x: [0, -5, 5, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
          className="text-rose-500 text-5xl font-black"
        >
          ✕
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <h1 className="text-3xl font-black text-slate-900 mb-2 font-display tracking-tight leading-tight">Payment Failed</h1>
        <p className="text-rose-400 mb-8 px-6 font-black text-[10px] uppercase tracking-[0.2em] leading-relaxed">
          The Birthday Network has rejected this transaction
        </p>

        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 text-left space-y-5 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Target</span>
            <span className="font-extrabold text-slate-900 text-sm">{userData.merchantName}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Reason</span>
            <span className="font-extrabold text-rose-500 text-xs text-right leading-tight max-w-[150px]">
              Merchant not on approved Birthday Guest List.
            </span>
          </div>
          <div className="pt-4 border-t border-slate-200">
             <p className="text-[9px] font-bold text-slate-400 text-center italic">
               "Fictional credits are only valid at Arushi's House. Please check the merchant verification status."
             </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl"
        >
          Try Different Merchant
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Failure;
