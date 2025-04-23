
import React from 'react';
import { MapPin } from 'lucide-react';
import ZurichMap from './ZurichMap';
import HotspotButtons from './map/HotspotButtons';
import { toast } from 'sonner';

interface DistrictSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDistrict: (district: string) => void;
}

const DistrictSelectionModal: React.FC<DistrictSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectDistrict 
}) => {
  if (!isOpen) return null;

  const handleHotspotSelect = (hotspot: string) => {
    toast.success("Perfekt! Du bist inere Hotspot-Zone!", {
      description: "Gratis Lieferig & schnellscht möglichi Lieferziit",
    });
    onSelectDistrict(hotspot);
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-brings-dark/95 z-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-brings-primary/20 to-brings-accent/20 p-6 rounded-lg border border-brings-primary/20 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-brings-primary/10 p-3 rounded-full">
              <MapPin size={24} className="text-brings-primary" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg text-white">Momentan liefered mir nur nach Züri</h3>
              <p className="text-gray-300">Mir sind dra, üses Liefergebiet z'erwütere. Bitte wähl Züri zum witerfahre.</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wähl din Chreis oder en Hotspot</h1>
          <p className="text-gray-300">Wähl usä, in welle Chreis vo Züri mir dir söllid liefere</p>
        </div>
        
        {/* Interactive Map */}
        <div className="h-[400px] mb-8 relative overflow-hidden rounded-xl border border-brings-primary/20">
          <ZurichMap onSelectDistrict={onSelectDistrict} />
        </div>

        {/* Hotspots */}
        <HotspotButtons onSelectHotspot={handleHotspotSelect} />
      </div>
    </div>
  );
};

export default DistrictSelectionModal;
