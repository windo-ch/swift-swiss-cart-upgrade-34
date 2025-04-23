
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ZurichMap from './ZurichMap';
import HotspotButtons from './map/HotspotButtons';
import { toast } from 'sonner';
import { districtNames } from '@/utils/zurichMapData';

// Define the Zurich districts with their data
const zurichDistricts = [
  { id: 'kreis1', name: districtNames['kreis1'], number: 1, active: true },
  { id: 'kreis2', name: districtNames['kreis2'], number: 2, active: true },
  { id: 'kreis3', name: districtNames['kreis3'], number: 3, active: true },
  { id: 'kreis4', name: districtNames['kreis4'], number: 4, active: true },
  { id: 'kreis5', name: districtNames['kreis5'], number: 5, active: true },
  { id: 'kreis6', name: districtNames['kreis6'], number: 6, active: true },
  { id: 'kreis7', name: districtNames['kreis7'], number: 7, active: true },
  { id: 'kreis8', name: districtNames['kreis8'], number: 8, active: true },
  { id: 'kreis9', name: districtNames['kreis9'], number: 9, active: true },
  { id: 'kreis10', name: districtNames['kreis10'], number: 10, active: true },
  { id: 'kreis11', name: districtNames['kreis11'], number: 11, active: true },
  { id: 'kreis12', name: districtNames['kreis12'], number: 12, active: true },
];

interface DistrictSelectionProps {
  city: string;
  onSelectDistrict: (district: string) => void;
  onBack: () => void;
}

const DistrictSelection: React.FC<DistrictSelectionProps> = ({ city, onSelectDistrict, onBack }) => {
  const handleHotspotSelect = (hotspot: string) => {
    toast.success("Perfekt! Du bist inere Hotspot-Zone!", {
      description: "Gratis Lieferig & schnellscht möglichi Lieferziit",
    });
    onSelectDistrict(hotspot);
  };

  return (
    <div className="fixed inset-0 overflow-auto bg-gradient-to-br from-brings-dark to-brings-primary/5">
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
          <h1 className="text-3xl font-bold text-white mb-2">Wähl din Chreis</h1>
          <p className="text-gray-300">Wähl usä, in welle Chreis vo Züri mir dir söllid liefere</p>
        </div>
        
        {/* Interactive Map */}
        <div className="mb-8">
          <ZurichMap onSelectDistrict={onSelectDistrict} />
        </div>

        {/* Hotspots */}
        <HotspotButtons onSelectHotspot={handleHotspotSelect} />
      </div>
    </div>
  );
};

export default DistrictSelection;
