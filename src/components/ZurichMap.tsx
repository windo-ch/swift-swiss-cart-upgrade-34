
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

// Define delivery data for each district
const deliveryData = {
  'kreis1': { time: '30-40', fee: 2.90 },
  'kreis2': { time: '35-45', fee: 3.50 },
  'kreis3': { time: '30-40', fee: 2.90 },
  'kreis4': { time: '25-35', fee: 2.50 },
  'kreis5': { time: '25-35', fee: 2.50 },
  'kreis6': { time: '30-40', fee: 2.90 },
  'kreis7': { time: '35-45', fee: 3.50 },
  'kreis8': { time: '40-50', fee: 3.90 },
  'kreis9': { time: '40-50', fee: 3.90 },
  'kreis10': { time: '35-45', fee: 3.50 },
  'kreis11': { time: '45-60', fee: 4.50 },
  'kreis12': { time: '40-55', fee: 4.20 },
};

// District names for reference
const districtNames = {
  'kreis1': 'Kreis
   1 (Altstadt)',
  'kreis2': 'Kreis 2 (Wollishofen)',
  'kreis3': 'Kreis 3 (Wiedikon)',
  'kreis4': 'Kreis 4 (Aussersihl)',
  'kreis5': 'Kreis 5 (Industriequartier)',
  'kreis6': 'Kreis 6 (Unterstrass)',
  'kreis7': 'Kreis 7 (Hottingen)',
  'kreis8': 'Kreis 8 (Riesbach)',
  'kreis9': 'Kreis 9 (Altstetten)',
  'kreis10': 'Kreis 10 (Wipkingen)',
  'kreis11': 'Kreis 11 (Affoltern)',
  'kreis12': 'Kreis 12 (Schwamendingen)',
};

interface ZurichMapProps {
  onSelectDistrict?: (district: string) => void;
  interactive?: boolean;
}

interface GeoJSONFeature {
  type: string;
  properties: {
    id: number;
    bezeichnung: string;
    gemeinde: string;
    kreis: string;
    kreis_name: string;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

const ZurichMap: React.FC<ZurichMapProps> = ({ 
  onSelectDistrict, 
  interactive = true 
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [districtPaths, setDistrictPaths] = useState<{ [key: string]: string }>({});
  const [districtCenters, setDistrictCenters] = useState<{ [key: string]: { x: number, y: number } }>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the polygon GeoJSON data for district boundaries
    const fetchDistrictData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_a');
        const data = await response.json();
        
        // Also fetch the point data for district centers
        const centerResponse = await fetch('https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_beschr_p');
        const centerData = await centerResponse.json();
        
        processGeoJSONData(data, centerData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
        setIsLoading(false);
        // Fallback to static paths if fetching fails
        setDistrictPaths(fallbackDistrictPaths);
        setDistrictCenters(fallbackDistrictCenters);
      }
    };

    fetchDistrictData();
  }, []);

  // Process GeoJSON data to create SVG paths and district centers
  const processGeoJSONData = (polygonData: any, centerData: any) => {
    const paths: { [key: string]: string } = {};
    const centers: { [key: string]: { x: number, y: number } } = {};
    
    // Process boundaries
    polygonData.features.forEach((feature: GeoJSONFeature) => {
      if (feature.geometry.type === 'MultiPolygon' || feature.geometry.type === 'Polygon') {
        const kreisNum = parseInt(feature.properties.kreis);
        if (!isNaN(kreisNum) && kreisNum >= 1 && kreisNum <= 12) {
          const districtId = `kreis${kreisNum}`;
          
          // Convert GeoJSON coordinates to SVG path
          let pathData = '';
          const coordinates = feature.geometry.type === 'Polygon' 
            ? [feature.geometry.coordinates[0]] 
            : feature.geometry.coordinates[0];
            
          coordinates.forEach((ring: any, index: number) => {
            // Scale and center the coordinates
            const scaledCoords = ring.map((coord: number[]) => [
              (coord[0] - 2678500) * 0.01 + 400,
              (coord[1] - 1247500) * -0.01 + 400
            ]);
            
            pathData += index === 0 ? 'M' : ' M';
            scaledCoords.forEach((coord: number[], i: number) => {
              pathData += i === 0 ? `${coord[0]},${coord[1]}` : ` L${coord[0]},${coord[1]}`;
            });
            pathData += ' Z';
          });
          
          paths[districtId] = pathData;
        }
      }
    });
    
    // Process district centers for text labels
    centerData.features.forEach((feature: GeoJSONFeature) => {
      const kreisNum = parseInt(feature.properties.kreis);
      if (!isNaN(kreisNum) && kreisNum >= 1 && kreisNum <= 12) {
        const districtId = `kreis${kreisNum}`;
        if (feature.geometry.type === 'Point') {
          const [x, y] = feature.geometry.coordinates;
          centers[districtId] = {
            x: (x - 2678500) * 0.01 + 400,
            y: (y - 1247500) * -0.01 + 400
          };
        }
      }
    });
    
    setDistrictPaths(paths);
    setDistrictCenters(centers);
  };

  const handleDistrictClick = (district: string) => {
    if (interactive) {
      if (onSelectDistrict) {
        onSelectDistrict(district);
      } else {
        toast.success(`${district.replace('kreis', 'Kreis ')} ausgewählt`, {
          description: `Lieferung in ${deliveryData[district]?.time || '30-60'} Minuten`,
        });
        navigate(`/order?district=${district}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brings-primary"></div>
      </div>
    );
  }

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
            onMouseEnter={() => setHoveredDistrict(district)}
            onMouseLeave={() => setHoveredDistrict(null)}
            onClick={() => handleDistrictClick(district)}
            fill={hoveredDistrict === district ? '#1D557A' : '#1D557A20'}
            stroke="#1D557A"
            strokeWidth="2"
            className={`cursor-pointer transition-colors duration-200 ${!interactive && 'pointer-events-none'}`}
          />
        ))}
        
        {/* District labels */}
        {Object.entries(districtCenters).map(([district, center]) => {
          const kreisNum = district.replace('kreis', '');
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
              Lieferung in {deliveryData[hoveredDistrict]?.time || '30-60'} Min.
            </div>
            <div className="mt-1">
              Liefergebühr: CHF {deliveryData[hoveredDistrict]?.fee.toFixed(2) || '3.50'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Fallback district paths in case the API request fails
const fallbackDistrictPaths = {
  'kreis1': "M424.7 391.3L429.6 390.9L435.7 392.9L440.5 397.3L443.7 403L445.1 409.5L444.9 416.2L442.9 422.3L439.8 427.2L435.3 430.6L429.9 432.2L424.2 432.1L418.8 430.2L414.2 426.8L410.7 422.1L408.7 416.5L408.3 410.4L409.6 404.5L412.2 399.1L416.1 394.7L420.6 392",
  'kreis2': "M407.1 455.1L413.8 448.8L421.5 444.5L430.1 442.3L438.9 442.5L447.3 445L454.7 449.6L460.2 455.8L463.9 463.2L465.2 471.6L464 479.8L460.5 487.5L454.8 493.8L447.5 498.1L439.3 500.3L430.5 500.2L422.2 497.8L414.8 493.3L409.2 487.1L405.6 479.8L404.2 471.5L405.4 463.2L407.1 455.1Z",
  'kreis3': "M363.6 414.2L371.3 409.7L379.9 407.4L388.7 407.6L397.1 410.2L404.5 414.9L410 421.2L413.6 428.7L414.9 437.1L413.6 445.4L410.1 453.1L404.4 459.3L396.7 463.5L388.5 465.7L379.8 465.6L371.4 463.1L364 458.4L358.5 452.1L354.9 444.6L353.6 436.2L354.9 427.9L358.4 420.2L363.6 414.2Z",
  'kreis4': "M396.7 378.6L404.4 374.1L413 371.9L421.8 372L430.2 374.6L437.6 379.3L443.1 385.5L446.7 393L448 401.4L446.7 409.7L443.2 417.4L437.5 423.6L429.8 427.9L421.6 430L412.9 429.9L404.5 427.4L397.1 422.7L391.6 416.5L388 409L386.7 400.6L388 392.3L391.5 384.6L396.7 378.6Z",
  'kreis5': "M354.5 365.4L362.2 360.9L370.8 358.6L379.6 358.8L388 361.4L395.4 366.1L400.9 372.3L404.5 379.8L405.8 388.2L404.5 396.5L401 404.2L395.3 410.4L387.6 414.7L379.4 416.8L370.7 416.7L362.3 414.2L354.9 409.5L349.4 403.3L345.8 395.8L344.5 387.4L345.8 379.1L349.3 371.4L354.5 365.4Z",
  'kreis6': "M434.3 342.2L442 337.7L450.6 335.4L459.4 335.6L467.8 338.2L475.2 342.9L480.7 349.1L484.3 356.6L485.6 365L484.3 373.3L480.8 381L475.1 387.2L467.4 391.5L459.2 393.6L450.5 393.5L442.1 391L434.7 386.3L429.2 380.1L425.6 372.6L424.3 364.2L425.6 355.9L429.1 348.2L434.3 342.2Z",
  'kreis7': "M481.7 357.6L489.4 353.1L498 350.8L506.8 351L515.2 353.6L522.6 358.3L528.1 364.5L531.7 372L533 380.4L531.7 388.7L528.2 396.4L522.5 402.6L514.8 406.9L506.6 409L497.9 408.9L489.5 406.4L482.1 401.7L476.6 395.5L473 388L471.7 379.6L473 371.3L476.5 363.6L481.7 357.6Z",
  'kreis8': "M503.5 418.3L511.2 413.8L519.8 411.5L528.6 411.7L537 414.3L544.4 419L549.9 425.2L553.5 432.7L554.8 441.1L553.5 449.4L550 457.1L544.3 463.3L536.6 467.6L528.4 469.7L519.7 469.6L511.3 467.1L503.9 462.4L498.4 456.2L494.8 448.7L493.5 440.3L494.8 432L498.3 424.3L503.5 418.3Z",
  'kreis9': "M303.5 412.9L311.2 408.4L319.8 406.1L328.6 406.3L337 408.9L344.4 413.6L349.9 419.8L353.5 427.3L354.8 435.7L353.5 444L350 451.7L344.3 457.9L336.6 462.2L328.4 464.3L319.7 464.2L311.3 461.7L303.9 457L298.4 450.8L294.8 443.3L293.5 434.9L294.8 426.6L298.3 418.9L303.5 412.9Z",
  'kreis10': "M365.5 310.7L373.2 306.2L381.8 303.9L390.6 304.1L399 306.7L406.4 311.4L411.9 317.6L415.5 325.1L416.8 333.5L415.5 341.8L412 349.5L406.3 355.7L398.6 360L390.4 362.1L381.7 362L373.3 359.5L365.9 354.8L360.4 348.6L356.8 341.1L355.5 332.7L356.8 324.4L360.3 316.7L365.5 310.7Z",
  'kreis11': "M341.5 257.6L349.2 253.1L357.8 250.8L366.6 251L375 253.6L382.4 258.3L387.9 264.5L391.5 272L392.8 280.4L391.5 288.7L388 296.4L382.3 302.6L374.6 306.9L366.4 309L357.7 308.9L349.3 306.4L341.9 301.7L336.4 295.5L332.8 288L331.5 279.6L332.8 271.3L336.3 263.6L341.5 257.6Z",
  'kreis12': "M493.3 288.9L501 284.4L509.6 282.1L518.4 282.3L526.8 284.9L534.2 289.6L539.7 295.8L543.3 303.3L544.6 311.7L543.3 320L539.8 327.7L534.1 333.9L526.4 338.2L518.2 340.3L509.5 340.2L501.1 337.7L493.7 333L488.2 326.8L484.6 319.3L483.3 310.9L484.6 302.6L488.1 294.9L493.3 288.9Z"
};

// Fallback district centers in case the API request fails
const fallbackDistrictCenters = {
  'kreis1': { x: 426, y: 412 },
  'kreis2': { x: 435, y: 470 },
  'kreis3': { x: 384, y: 437 },
  'kreis4': { x: 417, y: 401 },
  'kreis5': { x: 375, y: 387 },
  'kreis6': { x: 455, y: 364 },
  'kreis7': { x: 502, y: 380 },
  'kreis8': { x: 524, y: 440 },
  'kreis9': { x: 324, y: 435 },
  'kreis10': { x: 386, y: 333 },
  'kreis11': { x: 362, y: 280 },
  'kreis12': { x: 514, y: 311 }
};

export default ZurichMap;
