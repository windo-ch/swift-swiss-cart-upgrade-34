import { useState, useEffect } from "react";

// This is a simplified version of the hook since we're now using an image map
// instead of SVG paths. We keep it for backward compatibility.
export function useZurichMapData() {
  const [loading, setLoading] = useState(true);
  
  // Empty objects since we're not using SVG paths anymore
  const districtPaths = {};
  const districtCenters = {};

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return { districtPaths, districtCenters, loading };
}

// Types for backward compatibility
export interface DistrictPaths { [key: string]: string }
export interface DistrictCenters { [key: string]: { x: number, y: number } }
