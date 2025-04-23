
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import ZurichMap from './ZurichMap';
import { deliveryData, districtNames } from '@/utils/zurichMapData';

interface DistrictSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDistrict: (district: string) => void;
}

const DistrictSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectDistrict 
}: DistrictSelectionModalProps) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const handleDistrictSelect = (district: string) => {
    onSelectDistrict(district);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl border-none p-0 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-br from-brings-primary/10 to-brings-accent/10 p-6">
          <DialogTitle className="text-3xl font-bold text-center text-brings-dark">
            Wähl din Chreis
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Wähl usä, in welle Chreis vo Züri mir dir söllid liefere
          </p>
        </div>
        
        <div className="p-0">
          <div className="relative border-t border-brings-primary/10">
            <ZurichMap 
              onSelectDistrict={handleDistrictSelect}
              onHoverDistrict={setHoveredDistrict} 
            />
            
            {hoveredDistrict && (
              <div className="absolute bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg border border-brings-primary/20 backdrop-blur-sm bg-white/90">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-brings-primary/10 p-2 rounded-full">
                    <MapPin size={20} className="text-brings-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-brings-dark">{districtNames[hoveredDistrict]}</h3>
                    <div className="text-sm text-gray-600">
                      <p>Lieferzit: {deliveryData[hoveredDistrict]?.time || '30-60'} Min.</p>
                      <p>Liefergebühr: CHF {deliveryData[hoveredDistrict]?.fee.toFixed(2) || '3.50'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DistrictSelectionModal;
