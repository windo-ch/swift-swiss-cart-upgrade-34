
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

  // Map area coordinates
  const districtAreas = {
    kreis1: "424,391,430,391,436,393,441,397,444,403,445,410,445,416,443,422,440,427,435,431,430,432,424,432,419,430,414,427,411,422,409,417,408,410,410,405,412,399,416,395,421,392",
    kreis2: "407,455,414,449,422,445,430,442,439,443,447,445,455,450,460,456,464,463,465,472,464,480,461,488,455,494,448,498,439,500,431,500,422,498,415,493,409,487,406,480,404,472,405,463,407,455",
    kreis3: "364,414,371,410,380,407,389,408,397,410,405,415,410,421,414,429,415,437,414,445,410,453,404,459,397,464,389,466,380,466,371,463,364,458,359,452,355,445,354,436,355,428,358,420,364,414",
    kreis4: "397,379,404,374,413,372,422,372,430,375,438,379,443,386,447,393,448,401,447,410,443,417,438,424,430,428,422,430,413,430,405,427,397,423,392,417,388,409,387,401,388,392,392,385,397,379",
    kreis5: "355,365,362,361,371,359,380,359,388,361,395,366,401,372,405,380,406,388,405,397,401,404,395,410,388,415,379,417,371,417,362,414,355,410,349,403,346,396,345,387,346,379,349,371,355,365",
    kreis6: "434,342,442,338,451,335,459,336,468,338,475,343,481,349,484,357,486,365,484,373,481,381,475,387,467,392,459,394,451,394,442,391,435,386,429,380,426,373,424,364,426,356,429,348,434,342",
    kreis7: "482,358,489,353,498,351,507,351,515,354,523,358,528,365,532,372,533,380,532,389,528,396,523,403,515,407,507,409,498,409,490,406,482,402,477,396,473,388,472,380,473,371,477,364,482,358",
    kreis8: "504,418,511,414,520,412,529,412,537,414,544,419,550,425,554,433,555,441,554,449,550,457,544,463,537,468,528,470,520,470,511,467,504,462,498,456,495,449,494,440,495,432,498,424,504,418",
    kreis9: "304,413,311,408,320,406,329,406,337,409,344,414,350,420,354,427,355,436,354,444,350,452,344,458,337,462,328,464,320,464,311,462,304,457,298,451,295,443,294,435,295,427,298,419,304,413",
    kreis10: "366,311,373,306,382,304,391,304,399,307,406,311,412,318,416,325,417,334,416,342,412,350,406,356,399,360,390,362,382,362,373,360,366,355,360,349,357,341,356,333,357,324,360,317,366,311",
    kreis11: "342,258,349,253,358,251,367,251,375,254,382,258,388,265,392,272,393,280,392,289,388,296,382,303,375,307,366,309,358,309,349,306,342,302,336,296,333,288,332,280,333,271,336,264,342,258",
    kreis12: "493,289,501,284,510,282,518,282,527,285,534,290,540,296,543,303,545,312,543,320,540,328,534,334,526,338,518,340,510,340,501,338,494,333,488,327,485,319,483,311,485,303,488,295,493,289"
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative select-none">
      {/* Map container with clickable areas */}
      <div className="relative w-full mx-auto" style={{ maxWidth: "800px" }}>
        {/* Background Map Image */}
        <img
          src="/lovable-uploads/4c6b9ae0-4ef4-4856-a9f0-cc27d8537d85.png"
          alt="Zürich Karte"
          className="w-full"
          useMap="#zurich-map"
        />

        {/* Clickable map areas */}
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

        {/* District labels */}
        {Object.entries(deliveryData).map(([district, data]) => {
          const kreisNum = district.replace("kreis", "");
          const center = getDistrictCenter(district);
          return (
            <div
              key={`label-${district}`}
              className="absolute z-10 flex items-center justify-center rounded-full bg-brings-primary text-white font-bold w-8 h-8"
              style={{
                left: `${center.x}px`,
                top: `${center.y}px`,
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => interactive && handleDistrictClick(district)}
            >
              {kreisNum}
            </div>
          );
        })}
      </div>

      {/* Info box that appears when hovering over districts */}
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
  );
};

// Helper function to get the center coordinates of each district for labels
function getDistrictCenter(district: string): { x: number; y: number } {
  // These are approximate center points for each district
  const centers = {
    kreis1: { x: 426, y: 412 },
    kreis2: { x: 435, y: 470 },
    kreis3: { x: 384, y: 437 },
    kreis4: { x: 417, y: 401 },
    kreis5: { x: 375, y: 387 },
    kreis6: { x: 455, y: 364 },
    kreis7: { x: 502, y: 380 },
    kreis8: { x: 524, y: 440 },
    kreis9: { x: 324, y: 435 },
    kreis10: { x: 386, y: 333 },
    kreis11: { x: 362, y: 280 },
    kreis12: { x: 514, y: 311 }
  };
  return centers[district] || { x: 0, y: 0 };
}

export default ZurichMap;
