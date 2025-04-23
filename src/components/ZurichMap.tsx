import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { deliveryData, districtNames } from "@/utils/zurichMapData";

interface ZurichMapProps {
  onSelectDistrict?: (district: string) => void;
  interactive?: boolean;
}

const ZurichMap: React.FC<ZurichMapProps> = ({
  onSelectDistrict,
  interactive = true,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
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

  const districtCenters = {
    kreis1: { x: 50.2, y: 48.5 },
    kreis2: { x: 50, y: 70 },
    kreis3: { x: 40, y: 48 },
    kreis4: { x: 45, y: 45 },
    kreis5: { x: 45, y: 40 },
    kreis6: { x: 55, y: 38 },
    kreis7: { x: 65, y: 42 },
    kreis8: { x: 65, y: 55 },
    kreis9: { x: 30, y: 45 },
    kreis10: { x: 40, y: 35 },
    kreis11: { x: 45, y: 25 },
    kreis12: { x: 70, y: 32 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      <div className="relative w-full" style={{ aspectRatio: "1/1", maxHeight: "800px" }}>
        <img
          src="/lovable-uploads/b938290a-76a4-4f8a-8915-49f967922721.png"
          alt="Zürich Karte"
          className="w-full h-full object-contain"
          useMap="#zurich-map"
        />

        {Object.entries(districtCenters).map(([district, center]) => {
          const kreisNum = district.replace("kreis", "");
          return (
            <div
              key={district}
              className="absolute z-10 flex items-center justify-center text-white font-bold text-xl"
              style={{
                left: `${center.x}%`,
                top: `${center.y}%`,
                transform: "translate(-50%, -50%)",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                pointerEvents: "none"
              }}
            >
              {kreisNum}
            </div>
          );
        })}

        <map name="zurich-map">
          {Object.entries(districtAreas).map(([district, coords]) => (
            <area
              key={district}
              shape="poly"
              coords={coords}
              alt={districtNames[district]}
              title={districtNames[district]}
              onClick={() => handleDistrictClick(district)}
              onMouseEnter={() => setHoveredDistrict(district)}
              onMouseLeave={() => setHoveredDistrict(null)}
              style={{ cursor: interactive ? "pointer" : "default" }}
              className={!interactive ? "pointer-events-none" : ""}
            />
          ))}
        </map>

        {hoveredDistrict && (
          <div className="absolute bottom-4 right-4 bg-white p-4 shadow-md rounded-md border border-brings-primary/20 z-20">
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
    </div>
  );
};

export default ZurichMap;
