
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  onNext: (method: string) => void;
}

interface BankOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
}

const PRIVATE_BANKS: BankOption[] = [
  { id: 'hnt', name: 'Hineria National Trust', icon: '🏛️', color: 'bg-blue-600', desc: 'Secure Wealth Management' },
  { id: 'fcb', name: 'FutureCore Bank of Hineria', icon: '⚡', color: 'bg-cyan-500', desc: 'Digital First Banking' },
  { id: 'uff', name: 'Unity First Financial', icon: '🤝', color: 'bg-indigo-700', desc: 'Community Driven Growth' },
];

const GOVERNMENT_BANKS: BankOption[] = [
  { id: 'hsb', name: 'Hineria State Bank', icon: '🦁', color: 'bg-orange-600', desc: 'Official Government Gateway' },
];

const MethodSelection: React.FC<Props> = ({ onNext }) => {
  const [selected, setSelected] = useState(GOVERNMENT_BANKS[0].name);

  const handleSelect = (name: string) => {
    playTap();
    setSelected(name);
  };

  const handleNext = () => {
    playTap();
    onNext(selected);
  };

  const renderBankItem = (method: BankOption) => (
    <motion.button
      key={method.id}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleSelect(method.name)}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center space-x-4 relative group ${
        selected === method.name 
        ? 'border-rose-500 bg-rose-50/50 shadow-[0_10px_20px_rgba(244,63,94,0.1)] ring-1 ring-rose-500' 
        : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
    >
      <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-2xl shadow-lg transform transition-transform group-active:scale-90`}>
        {method.icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-slate-900 leading-tight text-sm tracking-tight">{method.name}</p>
        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{method.desc}</p>
      </div>
      {selected === method.name && (
        <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.button>
  );

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-500 ease-out">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">Select Bank</h2>
        <p className="text-slate-400 text-sm font-medium">Choose your financial institution</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pb-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-4 ml-1">Government Institution</h3>
          <div className="space-y-3">
            {GOVERNMENT_BANKS.map(renderBankItem)}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] mb-4 ml-1">Private Partners</h3>
          <div className="space-y-3">
            {PRIVATE_BANKS.map(renderBankItem)}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        className="w-full py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 mt-4"
      >
        <span>Proceed to PIN</span>
        <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

export default MethodSelection;
