
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playTap } from '../audio';
import { UserData } from '../types';

interface Props {
  selectedMerchant: UserData;
  onNext: (num: string) => void;
}

const NumberEntry: React.FC<Props> = ({ selectedMerchant, onNext }) => {
  const [num, setNum] = useState(selectedMerchant.merchantId.replace(/-/g, '').slice(0, 10));
  const maxDigits = 12;

  const addDigit = (d: string) => {
    playTap();
    if (num.length < maxDigits) {
      if (d === '00') {
        setNum(prev => (prev + d).slice(0, maxDigits));
      } else {
        setNum(prev => prev + d);
      }
    }
  };

  const removeDigit = () => {
    playTap();
    setNum(prev => prev.slice(0, -1));
  };

  const clearAll = () => {
    playTap();
    setNum('');
  };

  const handleNext = () => {
    playTap();
    onNext(num);
  };

  const formatNumber = (val: string) => {
    if (!val) return "0000 0000 0000";
    return val.padEnd(maxDigits, '•').replace(/(.{4})(.{4})(.{4})/, '$1 $2 $3');
  };

  const isArushi = selectedMerchant.merchantName === "Arushi's House";

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">Terminal Verification</h2>
        <p className="text-slate-400 text-sm font-semibold">Confirm the target terminal ID</p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full py-6 px-4 bg-slate-50 border border-slate-100 rounded-[2.5rem] mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
          <span className="text-xl font-black text-slate-900 tracking-[0.1em] font-mono z-10">
            {formatNumber(num)}
          </span>
        </div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm mb-6"
          >
            <div className={`w-12 h-12 ${isArushi ? 'bg-rose-500' : 'bg-slate-800'} rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg transition-transform`}>
              {isArushi ? 'AH' : '??'}
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 text-sm">{selectedMerchant.merchantName}</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className={`flex items-center space-x-1 px-1.5 py-0.5 ${isArushi ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} rounded-md border`}>
                  <div className={`w-1 h-1 ${isArushi ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full`}></div>
                  <p className={`text-[8px] font-black uppercase tracking-widest whitespace-nowrap ${isArushi ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isArushi ? 'Birthday Verified' : 'Standard Terminal'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tactical Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[320px] mx-auto mt-auto mb-4 bg-slate-50/50 p-4 rounded-[2.5rem]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <motion.button
              key={d}
              whileTap={{ scale: 0.9, backgroundColor: 'rgba(244,63,94,0.05)' }}
              onClick={() => addDigit(d.toString())}
              className="w-full h-14 text-2xl font-bold text-slate-700 bg-white rounded-2xl flex items-center justify-center shadow-sm active:shadow-none transition-all"
            >
              {d}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={clearAll}
            className="w-full h-14 text-xs font-black text-rose-400 bg-white rounded-2xl flex items-center justify-center shadow-sm uppercase tracking-widest"
          >
            CLR
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addDigit('0')}
            className="w-full h-14 text-2xl font-bold text-slate-700 bg-white rounded-2xl flex items-center justify-center shadow-sm"
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={removeDigit}
            className="w-full h-14 text-slate-300 bg-white rounded-2xl flex items-center justify-center shadow-sm hover:text-rose-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2H10.828a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-2xl transition-all"
      >
        Set Amount
      </motion.button>
    </div>
  );
};

export default NumberEntry;
