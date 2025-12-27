
import React from 'react';
import { motion } from 'framer-motion';
import { playTap } from '../audio';

interface Props {
  onNext: (course: string) => void;
}

const COURSES = [
  { id: 'app', title: 'Appetizers', icon: '🥨', desc: 'Pre-game snacks & drinks' },
  { id: 'main', title: 'The Main Event', icon: '🍕', desc: 'Arushi\'s Signature Pizzas' },
  { id: 'dessert', title: 'Sweet Victory', icon: '🧁', desc: 'Cakes, Cookies & Treats' },
  { id: 'special', title: 'Arushi Special', icon: '✨', desc: 'The Secret Chef\'s Menu' },
];

const CourseSelection: React.FC<Props> = ({ onNext }) => {
  const handleSelect = (course: string) => {
    playTap();
    onNext(course);
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 mb-1 font-display tracking-tight">What's for Dinner?</h2>
        <p className="text-slate-400 text-sm font-semibold">Select the course you're treating</p>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto no-scrollbar pb-6 flex-1">
        {COURSES.map((course, idx) => (
          <motion.button
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(course.title)}
            className="flex items-center space-x-4 p-5 bg-white border border-slate-100 rounded-3xl text-left hover:border-rose-300 transition-colors shadow-sm group"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-rose-50 transition-colors">
              {course.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-900">{course.title}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{course.desc}</p>
            </div>
            <div className="text-slate-200 group-hover:text-rose-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelection;
