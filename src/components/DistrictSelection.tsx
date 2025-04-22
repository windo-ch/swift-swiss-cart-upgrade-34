
import React from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ZurichMap from './ZurichMap';

interface DistrictSelectionProps {
  city: string;
  onSelectDistrict: (district: string) => void;
  onBack: () => void;
}

const zurichDistricts = [
  { id: 'kreis1', name: 'Kreis 1 (Altstadt)', number: 1, active: true },
  { id: 'kreis2', name: 'Kreis 2 (Wollishofen)', number: 2, active: true },
  { id: 'kreis3', name: 'Kreis 3 (Wiedikon)', number: 3, active: true },
  { id: 'kreis4', name: 'Kreis 4 (Aussersihl)', number: 4, active: true },
  { id: 'kreis5', name: 'Kreis 5 (Industriequartier)', number: 5, active: true },
  { id: 'kreis6', name: 'Kreis 6 (Unterstrass)', number: 6, active: true },
  { id: 'kreis7', name: 'Kreis 7 (Hottingen)', number: 7, active: true },
  { id: 'kreis8', name: 'Kreis 8 (Riesbach)', number: 8, active: true },
  { id: 'kreis9', name: 'Kreis 9 (Altstetten)', number: 9, active: true },
  { id: 'kreis10', name: 'Kreis 10 (Wipkingen)', number: 10, active: true },
  { id: 'kreis11', name: 'Kreis 11 (Affoltern)', number: 11, active: true },
  { id: 'kreis12', name: 'Kreis 12 (Schwamendingen)', number: 12, active: true },
];

const DistrictSelection: React.FC<DistrictSelectionProps> = ({ city, onSelectDistrict, onBack }) => {
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
        <h1 className="text-3xl font-bold text-brings-dark mb-2">Wähl din Kreis</h1>
        <p className="text-gray-600">Wähl usä, in welle Kreis vo Züri mir dir söllid liefere</p>
      </div>
      
      {/* Interactive Map */}
      <div className="mb-12">
        <ZurichMap onSelectDistrict={onSelectDistrict} />
      </div>
      
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
