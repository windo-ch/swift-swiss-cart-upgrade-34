
import React from "react";
import { MapPin } from "lucide-react";
import { deliveryData, districtNames } from "@/utils/zurichMapData";
import type { DistrictPaths, DistrictCenters } from "@/hooks/useZurichMapData";

interface ZurichSVGMapProps {
  districtPaths: DistrictPaths;
  districtCenters: DistrictCenters;
  hoveredDistrict: string | null;
  onDistrictHover: (district: string | null) => void;
  onDistrictClick: (district: string) => void;
  interactive?: boolean;
}

const ZurichSVGMap: React.FC<ZurichSVGMapProps> = ({
  districtPaths,
  districtCenters,
  hoveredDistrict,
  onDistrictHover,
  onDistrictClick,
  interactive = true,
}) => {
  return (
    <div className="max-w-5xl mx-auto relative select-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-brings-dark"
      >
        {/* Map boundaries */}
        {Object.entries(districtPaths).map(([district, path]) => (
          <path
            key={district}
            d={path}
            id={district}
            onMouseEnter={() => onDistrictHover(district)}
            onMouseLeave={() => onDistrictHover(null)}
            onClick={() => onDistrictClick(district)}
            fill={hoveredDistrict === district ? "#1D557A" : "#1D557A20"}
            stroke="#1D557A"
            strokeWidth="2"
            className={`cursor-pointer transition-colors duration-200 ${!interactive && "pointer-events-none"}`}
          />
        ))}

        {/* District labels */}
        {Object.entries(districtCenters).map(([district, center]) => {
          const kreisNum = district.replace("kreis", "");
          return (
            <text
              key={`text-${district}`}
              x={center.x}
              y={center.y}
              textAnchor="middle"
              fill="#fff"
              fontSize="16"
              fontWeight="bold"
              pointerEvents="none"
            >
              {kreisNum}
            </text>
          );
        })}
      </svg>

      {/* Info box that appears when hovering over districts */}
      {hoveredDistrict && (
        <div className="absolute bottom-0 right-0 bg-white p-4 shadow-md rounded-md border border-brings-primary/20">
          <h3 className="font-bold text-brings-dark">{districtNames[hoveredDistrict]}</h3>
          <div className="text-sm mt-1">
            <div className="flex items-center text-brings-dark">
              <MapPin size={16} className="mr-1 text-brings-primary" />
              Lieferung in {deliveryData[hoveredDistrict]?.time || "30-60"} Min.
            </div>
            <div className="mt-1">
              Liefergebühr: CHF {deliveryData[hoveredDistrict]?.fee.toFixed(2) || "3.50"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZurichSVGMap;
