
import { useEffect, useState } from "react";
import { fallbackDistrictPaths, fallbackDistrictCenters } from "@/utils/zurichMapData";

// Types for the geo data used in the map
export interface DistrictPaths { [key: string]: string }
export interface DistrictCenters { [key: string]: { x: number, y: number } }

interface GeoJSONFeature {
  type: string;
  properties: {
    id: number;
    bezeichnung: string;
    gemeinde: string;
    kreis: string;
    kreis_name?: string;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
}

// Hook to fetch and process the geo data for Zürich districts
export function useZurichMapData() {
  const [districtPaths, setDistrictPaths] = useState<DistrictPaths>(fallbackDistrictPaths);
  const [districtCenters, setDistrictCenters] = useState<DistrictCenters>(fallbackDistrictCenters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Zurich map data...");
        const polygonsReq = fetch(
          "https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_a"
        ).then(r => r.json());
        const centersReq = fetch(
          "https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_beschr_p"
        ).then(r => r.json());
        
        const [polygonData, centerData] = await Promise.all([polygonsReq, centersReq]);
        console.log("Received map data", { polygonData, centerData });
        
        // Always use fallback for now to ensure consistent rendering
        setDistrictPaths(fallbackDistrictPaths);
        setDistrictCenters(fallbackDistrictCenters);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
        // Use fallback data
        setDistrictPaths(fallbackDistrictPaths);
        setDistrictCenters(fallbackDistrictCenters);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { districtPaths, districtCenters, loading };
}
