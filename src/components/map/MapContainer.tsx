
import React from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      <svg 
        id="ZH-CITY-MAP" 
        viewBox="0 0 934.09 878.49" 
        className="w-full h-auto" 
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            .district {
              fill: #1d557a;
              transition: fill 0.3s ease;
              stroke: #0a2332;
              stroke-width: 2;
            }
            .district:hover {
              fill: #F97316;
              cursor: pointer;
            }
            text {
              fill: #ffffff;
              font-size: 12px;
              pointer-events: none;
              font-family: Arial, sans-serif;
            }
            .district-number {
              font-weight: bold;
              text-anchor: middle;
              dominant-baseline: middle;
            }
          `}</style>
        </defs>
        <g>
          {children}
        </g>
      </svg>
    </div>
  );
};

export default MapContainer;
