
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  onNext: (amount: string, currency: string) => void;
}

const CURRENCIES = ['Gems 💎', 'Credits 🎫', 'Points ✨', 'Coins 🪙'];
const QUICK_ADDS = [50, 100, 500, 1000];

const AmountEntry: React.FC<Props> = ({ onNext }) => {
  const [amount, setAmount] = useState('0');
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  const numAmount = parseInt(amount) || 0;
  const houseFee = Math.ceil(numAmount * 0.05);
  const arushiTax = numAmount > 0 ? 12 : 0; 
  const total = numAmount + houseFee + arushiTax;

  const addDigit = (d: string) => {
    playTap();
    if (amount === '0') {
      if (d === '0' || d === '00' || d === '000') return;
      setAmount(d);
    } else if (amount.length < 9) {
      setAmount(prev => (prev + d).slice(0, 9));
    }
  };

  const quickAdd = (val: number) => {
    playTap();
    setAmount(prev => (parseInt(prev || '0') + val).toString());
  };

  const removeDigit = () => {
    playTap();
    if (amount.length <= 1) setAmount('0');
    else setAmount(prev => prev.slice(0, -1));
  };

  const clearAmount = () => {
    playTap();
    setAmount('0');
  };

  const handleCurrencySelect = (c: string) => {
    playTap();
    setCurrency(c);
  };

  const handleNext = () => {
    playTap();
    onNext(total.toString(), currency);
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-500 ease-out">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg">
            AH
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none text-sm tracking-tight">Arushi's House</p>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">Terminal #0042</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-rose-50 rounded-full">
           <span className="text-[10px] text-rose-500 font-bold uppercase">Payment</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Big Amount Display */}
        <div className="flex flex-col items-center justify-center py-4 min-h-[160px]">
          <div className="flex items-baseline space-x-2">
            <motion.span 
              key={amount}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-black text-slate-900 font-display tracking-tight leading-none"
            >
              {amount}
            </motion.span>
            <span className="text-sm font-black text-rose-500 uppercase tracking-widest">{currency.split(' ')[0]}</span>
          </div>
          
          <AnimatePresence>
            {numAmount > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 w-full px-4 space-y-1 overflow-hidden"
              >
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>{amount}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>House Fee (5%)</span>
                  <span>+{houseFee}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold text-rose-400 uppercase tracking-widest">
                  <span>Birthday Surcharge</span>
                  <span>+{arushiTax}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-100 flex justify-between text-xs font-black text-slate-900 uppercase tracking-widest">
                  <span>Total Due</span>
                  <span>{total}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Add Chips */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {QUICK_ADDS.map(val => (
            <motion.button
              key={val}
              whileTap={{ scale: 0.95 }}
              onClick={() => quickAdd(val)}
              className="py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-100 transition-colors"
            >
              +{val}
            </motion.button>
          ))}
        </div>

        {/* Currency Selector */}
        <div className="flex space-x-2 overflow-x-auto pb-4 px-1 no-scrollbar -mx-2">
          {CURRENCIES.map(c => (
            <motion.button
              key={c}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCurrencySelect(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black transition-all border-2 ${
                currency === c 
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                : 'bg-white border-slate-100 text-slate-400'
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50/50 p-3 rounded-[2rem] border border-slate-100/50 mb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
            <motion.button
              key={d}
              whileTap={{ scale: 0.9 }}
              onClick={() => addDigit(d.toString())}
              className="h-11 text-xl font-bold text-slate-700 bg-white rounded-xl shadow-sm"
            >
              {d}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addDigit('00')}
            className="h-11 text-xs font-black text-slate-400 bg-white rounded-xl shadow-sm tracking-tighter"
          >
            00
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addDigit('0')}
            className="h-11 text-xl font-bold text-slate-700 bg-white rounded-xl shadow-sm"
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={removeDigit}
            className="h-11 text-slate-300 bg-white rounded-xl shadow-sm flex items-center justify-center hover:text-rose-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2H10.828a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </motion.button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: total > 0 ? 1.02 : 1 }}
        whileTap={{ scale: total > 0 ? 0.97 : 1 }}
        onClick={handleNext}
        disabled={total === 0}
        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 ${
          total > 0 
          ? 'bg-rose-500 text-white shadow-rose-200' 
          : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-60'
        }`}
      >
        <span className="tracking-tight">Pay {total} {currency.split(' ')[0]}</span>
      </motion.button>
    </div>
  );
};

export default AmountEntry;
