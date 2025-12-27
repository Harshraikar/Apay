
import React from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Merchant {
  id: string;
  name: string;
  icon: string;
  category: string;
  rating: string;
  accent: string;
}

const MERCHANTS: Merchant[] = [
  { id: 'AH-2024-99', name: "Arushi's House", icon: '🏠', category: 'Birthday Fine Dining', rating: '5.0', accent: 'border-rose-500 bg-rose-50/30' },
  { id: 'BG-9921-X', name: "Bistro Galaxy", icon: '🪐', category: 'Interstellar Snacks', rating: '3.2', accent: 'border-slate-100' },
  { id: 'SS-4402-F', name: "The Salty Spoon", icon: '🥄', category: 'Generic Cafeteria', rating: '2.8', accent: 'border-slate-100' },
  { id: 'GJ-1002-E', name: "Grumpy Joe's", icon: '🍔', category: 'Fast Food', rating: '1.5', accent: 'border-slate-100' },
];

interface Props {
  onNext: (m: Merchant) => void;
}

const MerchantSelection: React.FC<Props> = ({ onNext }) => {
  const handleSelect = (m: Merchant) => {
    playTap();
    onNext(m);
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-500 ease-out">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">Select Merchant</h2>
        <p className="text-slate-400 text-sm font-semibold">Which house are you treating?</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-6">
        {MERCHANTS.map((m, idx) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(m)}
            className={`w-full p-5 rounded-[2.5rem] border-2 text-left transition-all flex items-center space-x-4 relative group ${m.accent}`}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow">
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-sm">{m.name}</h3>
                <span className="text-[10px] font-black text-amber-500">⭐ {m.rating}</span>
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{m.category}</p>
              <div className="mt-2 flex items-center space-x-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${m.name === "Arushi's House" ? 'bg-emerald-500' : 'bg-rose-400'}`}></div>
                <p className={`text-[8px] font-black uppercase tracking-widest ${m.name === "Arushi's House" ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {m.name === "Arushi's House" ? 'Online & Ready' : 'System Maintenance'}
                </p>
              </div>
            </div>
            {m.name === "Arushi's House" && (
              <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                Recommended
              </div>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start space-x-3 mt-4">
        <span className="text-amber-500 text-lg">💡</span>
        <p className="text-[10px] font-bold text-amber-700 leading-normal">
          Only merchants with <b>Birthday Verified</b> status are currently accepting fictional credits.
        </p>
      </div>
    </div>
  );
};

export default MerchantSelection;
