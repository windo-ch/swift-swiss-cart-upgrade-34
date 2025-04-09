
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationSelectionProps {
  onSelectCity: (city: string) => void;
}

const locations = [
  {
    id: 'zurich',
    name: 'Züri',
    position: { x: 275, y: 680 },
    isActive: true
  },
  {
    id: 'winterthur',
    name: 'Winterthur',
    position: { x: 635, y: 427 },
    isActive: false
  },
  {
    id: 'dietikon',
    name: 'Dietikon',
    position: { x: 155, y: 673 },
    isActive: false
  },
  {
    id: 'uster',
    name: 'Uster',
    position: { x: 526, y: 740 },
    isActive: false
  }
];

const LocationSelection: React.FC<LocationSelectionProps> = ({ onSelectCity }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-brings-dark mb-2">Wo söll's hiigah?</h1>
        <p className="text-gray-600">Wähl dini Stadt zum witerfahre</p>
      </div>
      
      <div className="relative mb-8 border rounded-lg overflow-hidden shadow-md bg-white">
        <img
          src="/lovable-uploads/4c6b9ae0-4ef4-4856-a9f0-cc27d8537d85.png"
          alt="Kanton Zürich Map"
          className="w-full"
        />
        
        {locations.map((location) => (
          <div
            key={location.id}
            style={{
              position: 'absolute',
              left: `${location.position.x}px`,
              top: `${location.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div 
              className={`
                ${location.isActive ? 'bg-brings-primary text-white hover:bg-brings-primary/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                rounded-full w-8 h-8 flex items-center justify-center
              `}
              onClick={() => location.isActive && onSelectCity(location.id)}
            >
              <MapPin size={16} />
            </div>
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
              {location.name}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-brings-light p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-3">Verfügbari Liefergebiät</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {locations.map((location) => (
            <Button
              key={location.id}
              variant={location.isActive ? "default" : "outline"}
              disabled={!location.isActive}
              onClick={() => location.isActive && onSelectCity(location.id)}
              className={`w-full justify-start ${location.isActive ? 'bg-brings-primary hover:bg-brings-primary/90' : ''}`}
            >
              <MapPin size={16} className="mr-2" />
              {location.name}
              {!location.isActive && <span className="ml-auto text-xs text-gray-400">(Bald verfügbar)</span>}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-brings-primary/20 to-brings-accent/20 p-6 rounded-lg border border-brings-primary/20">
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
    </div>
  );
};

export default LocationSelection;
