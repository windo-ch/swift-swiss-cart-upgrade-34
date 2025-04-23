
import React from "react";
import { MapPin } from "lucide-react";
import { deliveryData, districtNames } from "@/utils/zurichMapData";

interface DistrictTooltipProps {
  district: string | null;
}

const DistrictTooltip = ({ district }: DistrictTooltipProps) => {
  if (!district) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg border border-brings-primary/20 backdrop-blur-sm bg-white/90">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-brings-primary/10 p-2 rounded-full">
          <MapPin size={20} className="text-brings-primary" />
        </div>
        <div className="ml-3">
          <h3 className="font-bold text-brings-dark">{districtNames[district]}</h3>
          <div className="text-sm text-gray-600">
            <p>Lieferzit: {deliveryData[district]?.time || '30-60'} Min.</p>
            <p>Liefergebühr: CHF {deliveryData[district]?.fee.toFixed(2) || '3.50'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictTooltip;
