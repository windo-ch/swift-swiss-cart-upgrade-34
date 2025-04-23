
import React from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      <svg viewBox="0 0 934.09 878.49" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
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
            .district-text {
              fill: #fff;
              font-size: 24px;
              font-weight: bold;
              pointer-events: none;
              text-anchor: middle;
              dominant-baseline: middle;
            }
          `}</style>
        </defs>
        <g>
          {children}
        </g>
        
        {/* District Numbers - rendered after paths so they're on top */}
        <text className="district-text" x="370" y="560">1</text>
        <text className="district-text" x="285" y="780">2</text>
        <text className="district-text" x="210" y="650">3</text>
        <text className="district-text" x="370" y="490">4</text>
        <text className="district-text" x="310" y="425">5</text>
        <text className="district-text" x="500" y="370">6</text>
        <text className="district-text" x="650" y="500">7</text>
        <text className="district-text" x="550" y="650">8</text>
        <text className="district-text" x="125" y="470">9</text>
        <text className="district-text" x="250" y="310">10</text>
        <text className="district-text" x="410" y="190">11</text>
        <text className="district-text" x="580" y="250">12</text>
      </svg>
    </div>
  );
};

export default MapContainer;
