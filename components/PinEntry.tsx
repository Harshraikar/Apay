
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  onNext: () => void;
}

const PinEntry: React.FC<Props> = ({ onNext }) => {
  const [pin, setPin] = useState('');
  const maxLen = 4;

  const addDigit = (d: string) => {
    playTap();
    if (pin.length < maxLen) {
      setPin(prev => prev + d);
    }
  };

  const removeDigit = () => {
    playTap();
    setPin(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    playTap();
    onNext();
  };

  const isComplete = pin.length === maxLen;

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="mb-12 text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-slate-200">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">Security Check</h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Enter your Hineria PIN</p>
      </div>

      <div className="flex-1 flex flex-col">
        {/* PIN Indicators */}
        <div className="flex justify-center space-x-6 mb-16">
          {[...Array(maxLen)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                scale: pin.length > i ? 1.4 : 1,
                backgroundColor: pin.length > i ? '#f43f5e' : 'transparent',
                borderColor: pin.length > i ? '#f43f5e' : '#e2e8f0'
              }}
              className="w-3.5 h-3.5 rounded-full border-2 transition-all"
            />
          ))}
        </div>

        {/* Tactical Keypad */}
        <div className="grid grid-cols-3 gap-6 max-w-[280px] mx-auto mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <motion.button
              key={d}
              whileTap={{ scale: 0.85 }}
              onClick={() => addDigit(d.toString())}
              className="w-16 h-16 text-2xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-100 rounded-2xl flex items-center justify-center transition-colors active:text-rose-500"
            >
              {d}
            </motion.button>
          ))}
          <div />
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => addDigit('0')}
            className="w-16 h-16 text-2xl font-bold text-slate-700 bg-slate-50/50 hover:bg-slate-100 rounded-2xl flex items-center justify-center transition-colors active:text-rose-500"
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={removeDigit}
            className="w-16 h-16 text-slate-300 bg-slate-50/50 hover:bg-rose-50 hover:text-rose-400 rounded-2xl flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2H10.828a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: isComplete ? 1.02 : 1 }}
          whileTap={{ scale: isComplete ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!isComplete}
          className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 ${
            isComplete ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Complete Payment</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PinEntry;
