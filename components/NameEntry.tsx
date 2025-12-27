
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  onNext: (name: string) => void;
}

const NameEntry: React.FC<Props> = ({ onNext }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      playTap();
      onNext(name);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div>
        <div className="w-24 h-24 bg-rose-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-3 shadow-[0_15px_30px_rgba(244,63,94,0.3)]">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-900 font-display tracking-tight leading-tight px-4">Arushi's House Payment</h1>
        <p className="text-slate-400 mt-3 font-medium text-sm">Deliciously secure birthday transactions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-left">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 mb-2 block">Guest Name</label>
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Who is treating Arushi?"
              className="w-full px-5 py-5 bg-slate-50 border-2 border-slate-100 focus:border-rose-500 focus:bg-white rounded-2xl outline-none transition-all text-lg font-semibold placeholder:text-slate-300 placeholder:font-medium"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-rose-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: name.trim() ? 1.02 : 1 }}
          whileTap={{ scale: name.trim() ? 0.97 : 1 }}
          type="submit"
          disabled={!name.trim()}
          className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl transition-all duration-300 transform ${
            name.trim() 
            ? 'bg-slate-900 hover:bg-black' 
            : 'bg-slate-200 cursor-not-allowed opacity-50'
          }`}
        >
          Check In
        </motion.button>
      </form>
    </div>
  );
};

export default NameEntry;
