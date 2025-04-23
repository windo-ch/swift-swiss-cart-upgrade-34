
import React from 'react';
import { Button } from '@/components/ui/button';

interface HotspotButtonsProps {
  onSelectHotspot: (hotspot: string) => void;
}

const hotspots = [
  { id: 'obere-lette', name: 'Obere Lette', emoji: '🌳' },
  { id: 'rentenwiese', name: 'Rentenwiese', emoji: '🌿' },
  { id: 'chinawiese', name: 'Chinawiese', emoji: '🎋' },
  { id: 'josefswiese', name: 'Josefswiese', emoji: '🌸' },
];

const HotspotButtons: React.FC<HotspotButtonsProps> = ({ onSelectHotspot }) => {
  return (
    <div className="mt-8">
      <div className="bg-brings-dark/5 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">Hotspots (Gratis Lieferig)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotspots.map((hotspot) => (
            <Button
              key={hotspot.id}
              onClick={() => onSelectHotspot(hotspot.id)}
              variant="outline"
              className="h-auto py-4 px-4 flex flex-col items-center gap-2 hover:bg-brings-primary hover:text-white group bg-white/5 border-white/10"
            >
              <span className="text-2xl group-hover:transform group-hover:scale-110 transition-transform">
                {hotspot.emoji}
              </span>
              <span className="text-sm font-medium">{hotspot.name}</span>
              <span className="text-xs text-brings-primary/70 group-hover:text-white/90">
                20-25 Min. • Gratis
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotspotButtons;
