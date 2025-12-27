
import React, { useState, useEffect } from 'react';
import { AppStep, UserData } from './types';
import NameEntry from './components/NameEntry';
import Welcome from './components/Welcome';
import MerchantSelection from './components/MerchantSelection';
import CourseSelection from './components/CourseSelection';
import NumberEntry from './components/NumberEntry';
import AmountEntry from './components/AmountEntry';
import MethodSelection from './components/MethodSelection';
import PinEntry from './components/PinEntry';
import Success from './components/Success';
import Failure from './components/Failure';
import Layout from './components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { playTick, playSuccess, playError } from './audio';

const STEP_ORDER = [
  AppStep.NAME_ENTRY,
  AppStep.WELCOME,
  AppStep.MERCHANT_SELECTION,
  AppStep.COURSE_SELECTION,
  AppStep.NUMBER_ENTRY,
  AppStep.AMOUNT_ENTRY,
  AppStep.METHOD_SELECTION,
  AppStep.PIN_ENTRY,
  AppStep.SUCCESS
];

const PROCESSING_MESSAGES = [
  "Connecting to secure gateway...",
  "Verifying merchant credentials...",
  "Authorizing payment flow...",
  "Securing transaction..."
];

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.NAME_ENTRY);
  const [isProcessing, setIsProcessing] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phoneNumber: '',
    amount: '',
    currencyType: 'Credits',
    paymentMethod: 'Hineria State Bank',
    course: 'General',
    merchantName: "Arushi's House",
    merchantId: 'AH-2024-99'
  });

  const nextStep = () => {
    switch (step) {
      case AppStep.NAME_ENTRY: setStep(AppStep.WELCOME); break;
      case AppStep.WELCOME: setStep(AppStep.MERCHANT_SELECTION); break;
      case AppStep.MERCHANT_SELECTION: 
        if (userData.merchantName === "Arushi's House") {
          setStep(AppStep.COURSE_SELECTION);
        } else {
          setStep(AppStep.NUMBER_ENTRY);
        }
        break;
      case AppStep.COURSE_SELECTION: setStep(AppStep.NUMBER_ENTRY); break;
      case AppStep.NUMBER_ENTRY: setStep(AppStep.AMOUNT_ENTRY); break;
      case AppStep.AMOUNT_ENTRY: setStep(AppStep.METHOD_SELECTION); break;
      case AppStep.METHOD_SELECTION: setStep(AppStep.PIN_ENTRY); break;
      case AppStep.PIN_ENTRY: 
        setIsProcessing(true);
        break;
      case AppStep.SUCCESS:
      case AppStep.FAILURE:
        setStep(AppStep.NAME_ENTRY);
        setUserData({ 
          name: '', 
          phoneNumber: '', 
          amount: '', 
          currencyType: 'Credits', 
          paymentMethod: 'Hineria State Bank',
          course: 'General',
          merchantName: "Arushi's House",
          merchantId: 'AH-2024-99'
        });
        break;
    }
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setMsgIndex(prev => (prev + 1) % PROCESSING_MESSAGES.length);
        playTick();
      }, 800);

      const timer = setTimeout(() => {
        setIsProcessing(false);
        if (userData.merchantName === "Arushi's House") {
          setStep(AppStep.SUCCESS);
          playSuccess();
        } else {
          setStep(AppStep.FAILURE);
          playError();
        }
      }, 3500);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setMsgIndex(0);
    }
  }, [isProcessing, userData.merchantName]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const progress = (STEP_ORDER.indexOf(step) + 1) / STEP_ORDER.length;

  return (
    <Layout isProcessing={isProcessing} progress={progress} title={userData.course}>
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full flex flex-col items-center justify-center space-y-12"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-28 h-28 border-[3px] border-slate-100 border-t-rose-500 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500"
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-4.514A9.01 9.01 0 0012 2c4.97 0 9 4.03 9 9s-4.03 9-9 9a8.959 8.959 0 01-4.5-1.207" />
                  </svg>
                </motion.div>
              </div>
            </div>
            
            <div className="text-center min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={PROCESSING_MESSAGES[msgIndex]}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-lg font-bold text-slate-800 font-display"
                >
                  {PROCESSING_MESSAGES[msgIndex]}
                </motion.p>
              </AnimatePresence>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-3">
                Target: {userData.merchantName}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            {step === AppStep.NAME_ENTRY && (
              <NameEntry onNext={(name) => { updateUserData({ name }); nextStep(); }} />
            )}
            {step === AppStep.WELCOME && (
              <Welcome name={userData.name} onNext={nextStep} />
            )}
            {step === AppStep.MERCHANT_SELECTION && (
              <MerchantSelection onNext={(m) => { updateUserData({ merchantName: m.name, merchantId: m.id }); nextStep(); }} />
            )}
            {step === AppStep.COURSE_SELECTION && (
              <CourseSelection onNext={(course) => { updateUserData({ course }); nextStep(); }} />
            )}
            {step === AppStep.NUMBER_ENTRY && (
              <NumberEntry selectedMerchant={userData} onNext={(num) => { updateUserData({ phoneNumber: num }); nextStep(); }} />
            )}
            {step === AppStep.AMOUNT_ENTRY && (
              <AmountEntry onNext={(amount, currencyType) => { updateUserData({ amount, currencyType }); nextStep(); }} />
            )}
            {step === AppStep.METHOD_SELECTION && (
              <MethodSelection onNext={(paymentMethod) => { updateUserData({ paymentMethod }); nextStep(); }} />
            )}
            {step === AppStep.PIN_ENTRY && (
              <PinEntry onNext={nextStep} />
            )}
            {step === AppStep.SUCCESS && (
              <Success userData={userData} onReset={nextStep} />
            )}
            {step === AppStep.FAILURE && (
              <Failure userData={userData} onReset={nextStep} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default App;
