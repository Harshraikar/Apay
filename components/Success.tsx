
import React, { useEffect, useState } from 'react';
import { UserData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { playTap, playSuccess } from '../audio';

interface Props {
  userData: UserData;
  onReset: () => void;
}

const SURPRISES = [
  "You must give Arushi a high-five!",
  "Tell a joke to the whole table!",
  "Next round of drinks is on you!",
  "Birthday girl chooses your next seat!",
  "You win a free Arushi-hug!"
];

const Success: React.FC<Props> = ({ userData, onReset }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const [surprise, setSurprise] = useState("");
  const [transactionId] = useState(() => `AH-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGift = () => {
    playSuccess();
    setShowConfetti(true);
    setSurprise(SURPRISES[Math.floor(Math.random() * SURPRISES.length)]);
    setShowGift(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleReset = () => {
    playTap();
    onReset();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Confetti Elements */}
      {showConfetti && [...Array(25)].map((_, i) => (
        <div 
          key={i}
          className="confetti rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#f43f5e', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'][Math.floor(Math.random() * 5)],
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}

      <AnimatePresence>
        {!showGift ? (
          <motion.div
            key="receipt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full flex flex-col items-center"
          >
            {/* Success Icon */}
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="w-20 h-20 bg-emerald-500 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-200/50"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h1 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">Payment Sent!</h1>
            <p className="text-slate-400 mb-6 font-semibold text-[10px] uppercase tracking-widest">Treat secured for Arushi</p>

            {/* Digital Receipt */}
            <div className="w-full bg-slate-50/80 backdrop-blur rounded-[2.5rem] p-6 mb-6 text-left space-y-4 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 -mr-16 -mt-16 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Course</span>
                <span className="font-extrabold text-slate-900 text-xs">{userData.course}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Bank</span>
                <span className="font-extrabold text-rose-500 text-xs">{userData.paymentMethod}</span>
              </div>

              {userData.promoCode && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">Promo</span>
                  <span className="font-extrabold text-emerald-500 text-xs">{userData.promoCode} (-{userData.discountAmount})</span>
                </div>
              )}

              <div className="pt-4 border-t-2 border-dashed border-slate-200 flex flex-col items-center py-2">
                <p className="text-4xl font-black text-slate-900 font-display tracking-tighter">{userData.amount}</p>
                <p className="text-[9px] text-rose-500 font-black uppercase tracking-[0.3em] mt-2">Verified {userData.currencyType.split(' ')[0]}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-[8px] font-black uppercase tracking-widest">Tx Hash</span>
                  <span className="text-[9px] font-mono font-bold text-slate-500">{transactionId}</span>
                </div>
              </div>
            </div>

            {/* Birthday Surprise Box CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="w-full mb-4 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl font-black text-sm shadow-xl flex items-center justify-center space-x-3"
            >
              <span>🎁 Open Birthday Surprise</span>
            </motion.button>

            <button
              onClick={handleReset}
              className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Close Receipt
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center px-4"
          >
            <div className="w-32 h-32 bg-rose-500 rounded-full flex items-center justify-center text-6xl mb-8 shadow-2xl shadow-rose-200 animate-bounce">
              🍰
            </div>
            <h2 className="text-3xl font-black text-slate-900 font-display mb-4">You Got a Duty!</h2>
            <div className="p-8 bg-white border-2 border-rose-100 rounded-[3rem] shadow-xl w-full">
              <p className="text-xl font-bold text-rose-500 leading-relaxed italic">"{surprise}"</p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleReset}
              className="mt-12 w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg"
            >
              I'm Done!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Success;
