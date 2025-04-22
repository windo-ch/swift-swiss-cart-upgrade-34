
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useZurichMapData } from "@/hooks/useZurichMapData";
import { deliveryData, districtNames } from "@/utils/zurichMapData";
import ZurichSVGMap from "./ZurichSVGMap";

interface ZurichMapProps {
  onSelectDistrict?: (district: string) => void;
  interactive?: boolean;
}

const ZurichMap: React.FC<ZurichMapProps> = ({
  onSelectDistrict,
  interactive = true,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const { districtPaths, districtCenters, loading } = useZurichMapData();
  const navigate = useNavigate();

  const handleDistrictClick = (district: string) => {
    if (!interactive) return;
    if (onSelectDistrict) {
      onSelectDistrict(district);
    } else {
      toast.success(`${district.replace("kreis", "Kreis ")} ausgewählt`, {
        description: `Lieferung in ${deliveryData[district]?.time || "30-60"} Minuten`,
      });
      navigate(`/order?district=${district}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brings-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ZurichSVGMap
        districtPaths={districtPaths}
        districtCenters={districtCenters}
        hoveredDistrict={hoveredDistrict}
        onDistrictHover={setHoveredDistrict}
        onDistrictClick={handleDistrictClick}
        interactive={interactive}
      />
    </div>
  );
};

export default ZurichMap;
