
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface District {
  id: number;
  name: string;
  path: string;
}

const districts: District[] = [
  { id: 1, name: "Kreis 1", path: "M320,340 L340,320 L360,340 L340,360 Z" },
  { id: 2, name: "Kreis 2", path: "M320,420 L300,380 L340,360 L380,380 Z" },
  { id: 3, name: "Kreis 3", path: "M260,360 L300,340 L320,380 L280,400 Z" },
  { id: 4, name: "Kreis 4", path: "M300,320 L340,300 L360,340 L320,360 Z" },
  { id: 5, name: "Kreis 5", path: "M280,300 L320,280 L340,320 L300,340 Z" },
  { id: 6, name: "Kreis 6", path: "M340,260 L380,240 L400,280 L360,300 Z" },
  { id: 7, name: "Kreis 7", path: "M400,280 L440,260 L460,300 L420,320 Z" },
  { id: 8, name: "Kreis 8", path: "M380,340 L420,320 L440,360 L400,380 Z" },
  { id: 9, name: "Kreis 9", path: "M220,320 L260,300 L280,340 L240,360 Z" },
  { id: 10, name: "Kreis 10", path: "M260,260 L300,240 L320,280 L280,300 Z" },
  { id: 11, name: "Kreis 11", path: "M300,200 L340,180 L360,220 L320,240 Z" },
  { id: 12, name: "Kreis 12", path: "M400,220 L440,200 L460,240 L420,260 Z" },
];

const ZurichMap = () => {
  const navigate = useNavigate();

  const handleDistrictClick = (district: District) => {
    navigate('/order', { state: { selectedDistrict: district.id } });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg 
        viewBox="200 160 300 300" 
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Water bodies */}
        <path
          d="M320,340 L380,320 L420,360 L380,400 Z"
          fill="#7FD6EB"
          opacity="0.3"
          className="pointer-events-none"
        />
        
        {districts.map((district) => (
          <g key={district.id}>
            <path
              d={district.path}
              fill="white"
              stroke="#1A2E45"
              strokeWidth="2"
              className="transition-colors duration-200 hover:fill-brings-primary/20 cursor-pointer"
              onClick={() => handleDistrictClick(district)}
            />
            <text
              x={district.id === 1 ? "340" : "320"}
              y={district.id === 1 ? "340" : "320"}
              textAnchor="middle"
              className="text-sm font-medium pointer-events-none"
              fill="#1A2E45"
            >
              {district.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ZurichMap;
