
import React from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brings-dark to-brings-dark/95 flex items-center justify-center">
      <div className="w-full h-full mx-auto relative select-none">
        <div className="absolute inset-0 bg-brings-primary/5 backdrop-blur-sm border border-brings-primary/10" />
        <svg 
          id="ZH-CITY-MAP" 
          viewBox="0 0 934.09 878.49" 
          className="w-full h-full relative z-10" 
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>{`
              .district {
                fill: #1d557a;
                transition: all 0.4s ease;
                stroke: #0a2332;
                stroke-width: 2;
                cursor: pointer;
              }
              .district:hover {
                fill: #FF6B00;
                filter: drop-shadow(0 0 8px rgba(255, 107, 0, 0.3));
                transform: translateY(-1px);
              }
              text {
                fill: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 14px;
                pointer-events: none;
                text-anchor: middle;
                dominant-baseline: middle;
                filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5));
              }
              .district-number {
                font-weight: 700;
                font-size: 16px;
              }
            `}</style>
          </defs>
          <g>
            {children}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default MapContainer;
