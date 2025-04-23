import React from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ZurichMap from './ZurichMap';
import HotspotButtons from './map/HotspotButtons';
import { toast } from 'sonner';

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
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-brings-primary/20 to-brings-accent/20 p-6 rounded-lg border border-brings-primary/20 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-brings-primary/10 p-3 rounded-full">
            <MapPin size={24} className="text-brings-primary" />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg">Momentan liefered mir nur nach Züri</h3>
            <p className="text-gray-600">Mir sind dra, üses Liefergebiet z'erwütere. Bitte wähl Züri zum witerfahre.</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brings-dark mb-2">Wähl din Chreis</h1>
        <p className="text-gray-600">Wähl usä, in welle Chreis vo Züri mir dir söllid liefere</p>
      </div>
      
      {/* Interactive Map */}
      <div className="mb-8 border border-brings-primary/20 rounded-lg overflow-hidden shadow-lg">
        <ZurichMap onSelectDistrict={onSelectDistrict} />
      </div>

      {/* Hotspots */}
      <HotspotButtons onSelectHotspot={handleHotspotSelect} />
      
      {/* District List */}
      <div className="bg-brings-light p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Alli Kreis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {zurichDistricts.map((district) => (
            <Button
              key={district.id}
              variant="outline"
              onClick={() => district.active && onSelectDistrict(district.id)}
              className="w-full justify-start hover:bg-brings-primary hover:text-white"
            >
              <div className="w-6 h-6 rounded-full bg-brings-primary/20 text-brings-primary flex items-center justify-center mr-2 font-bold text-xs">
                {district.number}
              </div>
              {district.name.split(' ')[0]} <span className="text-xs ml-1 opacity-70">{district.name.split(' ')[1]}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistrictSelection;
