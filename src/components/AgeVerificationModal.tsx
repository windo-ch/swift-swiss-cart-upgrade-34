import React from 'react';
import { CheckCircle, XCircle, ShieldAlert, Wine, Beer, Cigarette, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (isAdult: boolean) => void;
}

const AgeVerificationModal = ({ isOpen, onVerify }: AgeVerificationModalProps) => {
  // Early return if modal is not open
  if (!isOpen) return null;
  
  const handleVerify = (isAdult: boolean) => {
    // Prevent duplicate calls
    onVerify(isAdult);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl px-4 py-8 md:px-8"
      >
        <div className="relative bg-gradient-to-br from-brings-dark/80 to-brings-primary/80 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Background decoration elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brings-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brings-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 z-0"></div>
          
          <div className="relative z-10 p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col items-center space-y-6 mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-br from-brings-primary to-brings-primary/80 p-5 rounded-full shadow-lg"
              >
                <ShieldAlert className="h-12 w-12 text-white" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Willkomme bi Brings!
                </h1>
                <p className="text-lg text-brings-light/90 max-w-xl">
                  Bevor du witerfahrsch, muesch du bestätige dass du mindestens 18 Johr alt bisch.
                </p>
              </motion.div>
            </div>

            {/* Age verification content */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center bg-white/5 p-5 rounded-lg"
                >
                  <Wine size={28} className="text-brings-primary mb-3" />
                  <h3 className="font-semibold text-white mb-1">Alkoholischi Getränk</h3>
                  <p className="text-sm text-center text-gray-300">Nur für Persone ab 18 Johr</p>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-center bg-white/5 p-5 rounded-lg"
                >
                  <Cigarette size={28} className="text-brings-primary mb-3" />
                  <h3 className="font-semibold text-white mb-1">Tabakware</h3>
                  <p className="text-sm text-center text-gray-300">Nur für Persone ab 18 Johr</p>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col items-center bg-white/5 p-5 rounded-lg"
                >
                  <Clock3 size={28} className="text-brings-primary mb-3" />
                  <h3 className="font-semibold text-white mb-1">Schnelli Lieferig</h3>
                  <p className="text-sm text-center text-gray-300">Vo ausgewählte Produkt</p>
                </motion.div>
              </div>

              <div className="my-8 border-t border-white/10 pt-8">
                <p className="text-white text-center mb-6 font-medium">
                  Bisch du scho 18 Johr alt oder älter?
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => handleVerify(false)}
                    className="flex-1 sm:max-w-[200px] py-6 bg-gray-900/60 border-gray-700 hover:bg-gray-800 text-white hover:text-white hover:border-red-500/50 transition-all duration-300 group"
                  >
                    <XCircle className="h-5 w-5 text-red-400 group-hover:scale-110 transition-transform" />
                    <span>Nei, ich bin under 18</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleVerify(true)}
                    className="flex-1 sm:max-w-[200px] py-6 bg-gradient-to-r from-brings-primary to-brings-accent hover:opacity-90 hover:scale-105 text-white gap-2 transition-all duration-300 group shadow-lg hover:shadow-brings-primary/25"
                  >
                    <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Ja, ich bin über 18</span>
                  </Button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 mt-6">
                <p>Mit dem Bestätige vom Alter akzeptiersch du üsi <a href="/agb" className="underline hover:text-white">AGBs</a> und <a href="/dateschutz" className="underline hover:text-white">Datenschutzbestimmige</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgeVerificationModal;
