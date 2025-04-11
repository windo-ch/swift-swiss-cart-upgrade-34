
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ShieldAlert } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (isAdult: boolean) => void;
}

const AgeVerificationModal = ({ isOpen, onVerify }: AgeVerificationModalProps) => {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-md border-2 border-brings-primary rounded-xl">
        <DialogHeader className="space-y-3">
          <div className="flex justify-center">
            <ShieldAlert className="h-16 w-16 text-brings-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-brings-dark">
            Altersbestätigung
          </DialogTitle>
          <DialogDescription className="text-base text-center font-medium text-gray-600">
            Bisch du scho 18 Johr alt oder älter?
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            Um alkoholischi Getränk und Tabakware uf üsere Siite z'gseh, muesch du mindestens 18 Johr alt si.
          </p>
          
          <div className="bg-brings-primary/10 p-3 rounded-lg border border-brings-primary/20">
            <p className="text-xs text-brings-dark font-medium">
              Mir händ alkoholischi Getränk, wo nur für Persone ab 18 Johr erhältlich sind.
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onVerify(false)}
            className="flex-1 py-6 border-red-300 hover:bg-red-50 hover:text-red-600 space-x-2"
          >
            <XCircle className="h-5 w-5 text-red-500" />
            <span>Nei, ich bin under 18</span>
          </Button>
          <Button 
            onClick={() => onVerify(true)}
            className="flex-1 py-6 bg-brings-primary hover:bg-brings-primary/90 space-x-2"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Ja, ich bin über 18</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
