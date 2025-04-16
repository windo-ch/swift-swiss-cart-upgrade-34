
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gift, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FirstTimeUserBanner = () => {
  const { user, isFirstTimeUser, hasAppliedDiscount, applyFirstTimeDiscount } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Only show the banner if:
    // 1. User is logged in
    // 2. User is a first-time user
    // 3. User hasn't already applied the discount
    if (user && isFirstTimeUser && !hasAppliedDiscount) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user, isFirstTimeUser, hasAppliedDiscount]);

  const handleApplyDiscount = async () => {
    try {
      await applyFirstTimeDiscount();
      toast({
        title: "Rabatt freigschaltet!",
        description: "Din 10% Rabatt als Neukund isch für dini nächsti Bstellig parat.",
      });
      setIsVisible(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Rabatt chonnt nöd aktiviert werde. Bitte probier's spöter nomal.",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-72 max-w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="bg-brings-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Gift size={18} className="mr-2" />
          <span className="font-medium">Willkomme!</span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">10% Rabatt für Neukunde</h3>
        <p className="text-sm text-gray-600 mb-3">
          Als neue Chund bekommsch du 10% Rabatt uf dini ersti Bstellig!
        </p>
        <div className="flex gap-2">
          <Button 
            onClick={handleApplyDiscount}
            className="w-full bg-brings-primary hover:bg-brings-primary/90"
          >
            Rabatt aktiviere
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUserBanner;
