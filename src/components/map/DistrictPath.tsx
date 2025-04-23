
import React from "react";

interface DistrictPathProps {
  path: string;
  district: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const DistrictPath = ({ path, district, onMouseEnter, onMouseLeave, onClick }: DistrictPathProps) => {
  return (
    <path
      className="district"
      d={path}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default DistrictPath;
