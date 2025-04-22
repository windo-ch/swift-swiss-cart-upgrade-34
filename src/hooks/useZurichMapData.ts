
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
  const [districtPaths, setDistrictPaths] = useState<DistrictPaths>({});
  const [districtCenters, setDistrictCenters] = useState<DistrictCenters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const polygonsReq = fetch(
          "https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_a"
        ).then(r => r.json());
        const centersReq = fetch(
          "https://www.ogd.stadt-zuerich.ch/wfs/geoportal/Stadtkreise?service=WFS&version=1.1.0&request=GetFeature&outputFormat=GeoJSON&typename=adm_stadtkreise_beschr_p"
        ).then(r => r.json());
        const [polygonData, centerData] = await Promise.all([polygonsReq, centersReq]);
        processGeoJSONData(polygonData, centerData);
        setLoading(false);
      } catch {
        // Fallback
        setDistrictPaths(fallbackDistrictPaths);
        setDistrictCenters(fallbackDistrictCenters);
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line
  }, []);

  const processGeoJSONData = (polygonData: any, centerData: any) => {
    const paths: DistrictPaths = {};
    const centers: DistrictCenters = {};

    polygonData.features.forEach((feature: GeoJSONFeature) => {
      if (feature.geometry.type === "MultiPolygon" || feature.geometry.type === "Polygon") {
        const kreisNum = parseInt(feature.properties.kreis);
        if (!isNaN(kreisNum) && kreisNum >= 1 && kreisNum <= 12) {
          const districtId = `kreis${kreisNum}`;
          let pathData = "";
          const polygonCoordinates =
            feature.geometry.type === "Polygon"
              ? [feature.geometry.coordinates[0]]
              : feature.geometry.coordinates[0];

          polygonCoordinates.forEach((ring: any, index: number) => {
            const scaledCoords = ring.map((coord: number[]) => [
              (coord[0] - 2678500) * 0.01 + 400,
              (coord[1] - 1247500) * -0.01 + 400,
            ]);
            pathData += index === 0 ? "M" : " M";
            scaledCoords.forEach((coord: number[], i: number) => {
              pathData += i === 0 ? `${coord[0]},${coord[1]}` : ` L${coord[0]},${coord[1]}`;
            });
            pathData += " Z";
          });

          paths[districtId] = pathData;
        }
      }
    });

    centerData.features.forEach((feature: GeoJSONFeature) => {
      const kreisNum = parseInt(feature.properties.kreis);
      if (!isNaN(kreisNum) && kreisNum >= 1 && kreisNum <= 12) {
        const districtId = `kreis${kreisNum}`;
        if (feature.geometry.type === "Point") {
          const [x, y] = feature.geometry.coordinates;
          centers[districtId] = {
            x: (x - 2678500) * 0.01 + 400,
            y: (y - 1247500) * -0.01 + 400,
          };
        }
      }
    });

    setDistrictPaths(paths);
    setDistrictCenters(centers);
  };

  return { districtPaths, districtCenters, loading };
}
