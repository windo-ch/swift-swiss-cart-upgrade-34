
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { deliveryData, districtNames, fallbackDistrictPaths } from "@/utils/zurichMapData";

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

  // Define the district center coordinates
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

  // Define clickable area coordinates for the image map
  const districtAreas: Record<string, string> = {
    kreis1: "427,391,449,416,435,430,421,435,410,418,414,401",
    kreis2: "438,443,464,463,465,479,455,493,440,500,423,490,407,455,424,445",
    kreis3: "380,407,404,414,410,428,405,450,388,465,372,462,357,452,353,436,358,420,371,410",
    kreis4: "413,372,443,383,445,401,431,429,403,429,388,416,387,400,398,384",
    kreis5: "371,359,395,366,404,379,404,396,387,415,370,417,349,403,344,386,357,370",
    kreis6: "442,338,467,338,480,349,485,365,475,387,459,394,434,386,429,372,429,355,440,342",
    kreis7: "489,353,515,354,528,364,531,380,522,396,506,409,490,407,476,395,472,379,476,364",
    kreis8: "511,414,537,414,549,425,553,441,544,458,528,470,511,467,498,456,494,440,498,424",
    kreis9: "328,406,344,414,353,427,344,457,328,464,311,462,298,451,293,435,297,419,319,406",
    kreis10: "381,304,399,307,415,325,406,349,390,362,365,355,356,341,356,324,373,306",
    kreis11: "358,251,375,254,391,272,388,296,366,309,342,302,332,288,332,271,349,253",
    kreis12: "510,282,527,285,539,296,544,312,534,333,518,340,501,338,488,327,483,311,494,289"
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
