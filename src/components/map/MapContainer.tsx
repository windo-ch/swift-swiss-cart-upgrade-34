
import React from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      <svg viewBox="0 0 934.09 878.49" className="w-full h-auto">
        <defs>
          <style>{`
            .district {
              fill: #1d557a;
              transition: fill 0.3s ease;
            }
            .district:hover {
              fill: #F97316;
              cursor: pointer;
            }
            .district-text {
              fill: #fff;
              font-size: 12px;
              pointer-events: none;
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
