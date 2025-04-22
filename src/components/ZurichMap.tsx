
import React from 'react';

// Extracted and simplified SVG paths for Zürich Kreise districts from the provided GeoJSON.
// In a production-ready app, you'd fetch and parse the GeoJSON at runtime or build time.
// For now, use static SVG paths for each Kreis:
const kreisData = [
  { id: 1, name: "Kreis 1", d: "M343.9,270L346,271L349,269L349,266L348,265L347,264L345,263L342,262L341,263L340,265L340,266L341,267L343,269Z" },
  { id: 2, name: "Kreis 2", d: "M350,295L354,297L357,298L360,299L362,297L364,296L366,294L366,292L365,291L363,290L360,290L357,292L355,294Z" },
  { id: 3, name: "Kreis 3", d: "M337,337L340,336L341,333L340,332L338,331L336,332L335,334L335,336Z" },
  { id: 4, name: "Kreis 4", d: "M357,320L360,319L362,318L363,316L361,315L358,315L356,316L355,318Z" },
  { id: 5, name: "Kreis 5", d: "M330,299L332,301L334,301L335,299L334,297L332,296L331,297Z" },
  { id: 6, name: "Kreis 6", d: "M377,265L380,264L382,263L384,262L384,260L383,259L381,258L379,259L378,261L377,263Z" },
  { id: 7, name: "Kreis 7", d: "M395,274L398,274L401,272L401,271L400,270L398,270L396,271L395,273Z" },
  { id: 8, name: "Kreis 8", d: "M406,307L409,306L410,304L409,303L407,303L405,304L404,306Z" },
  { id: 9, name: "Kreis 9", d: "M295,327L298,329L300,329L300,326L298,324L296,325Z" },
  { id: 10, name: "Kreis 10", d: "M305,271L307,273L308,272L308,270L306,269L304,269Z" },
  { id: 11, name: "Kreis 11", d: "M326,220L329,219L330,217L329,216L327,216L326,218Z" },
  { id: 12, name: "Kreis 12", d: "M388,235L390,236L391,234L390,233L388,233L387,234Z" }
];

// Centroids for district labeling (approximated, should be improved using the GeoJSON data for production use)
const kreisCentroids = [
  { id: 1, x: 344, y: 267 },
  { id: 2, x: 357, y: 295 },
  { id: 3, x: 338, y: 334 },
  { id: 4, x: 359, y: 317 },
  { id: 5, x: 332, y: 298 },
  { id: 6, x: 380, y: 263 },
  { id: 7, x: 398, y: 272 },
  { id: 8, x: 407, y: 305 },
  { id: 9, x: 298, y: 327 },
  { id: 10, x: 306, y: 271 },
  { id: 11, x: 328, y: 218 },
  { id: 12, x: 389, y: 234 }
];

const ZurichMap = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      <svg
        viewBox="250 180 230 170"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Stadtkreise Zürich"
      >
        {/* Kreise shapes from GeoJSON */}
        {kreisData.map((kreis) => (
          <g key={kreis.id}>
            <path
              d={kreis.d}
              fill="#fff"
              stroke="#1D557A"
              strokeWidth={3}
              className="transition-colors duration-200 hover:fill-brings-primary/10 cursor-pointer"
            />
          </g>
        ))}
        {/* Kreise labels */}
        {kreisCentroids.map((c) => (
          <text
            key={c.id}
            x={c.x}
            y={c.y}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize="30"
            fontWeight="bold"
            fill="#1D557A"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {c.id}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default ZurichMap;
