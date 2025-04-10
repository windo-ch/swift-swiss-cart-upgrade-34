
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (isAdult: boolean) => void;
}

const AgeVerificationModal = ({ isOpen, onVerify }: AgeVerificationModalProps) => {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-brings-dark">Altersbestätigung</DialogTitle>
          <DialogDescription className="mt-2 text-base text-gray-600">
            Bisch du scho 18 Johr alt oder älter?
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-500">
            Um alkoholischi Getränk und Tabakware uf üsere Siite z'gseh, muesch du mindestens 18 Johr alt si.
          </p>
        </div>
        
        <DialogFooter className="flex space-x-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => onVerify(false)}
            className="flex-1"
          >
            Nei, ich bin under 18
          </Button>
          <Button 
            onClick={() => onVerify(true)}
            className="flex-1 bg-brings-primary hover:bg-brings-primary/90"
          >
            Ja, ich bin über 18
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
