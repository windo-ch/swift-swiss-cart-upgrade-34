
import React from "react";

interface DistrictPathProps {
  path: string;
  district: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  className?: string;
}

const DistrictPath = ({ 
  path, 
  district, 
  onMouseEnter, 
  onMouseLeave, 
  onClick,
  className = "district" 
}: DistrictPathProps) => {
  return (
    <path
      className={className}
      d={path}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-district={district}
    />
  );
};

export default DistrictPath;
