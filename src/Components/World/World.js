import React from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';

const { useLayoutEffect, useState, useEffect, useMemo } = React;

export default function World() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    // load data // src: http://geojson.xyz/
    fetch('./ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop) = PIB par habitant
  const getVal = feat =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(() => Math.max(...countries.features.map(getVal)), [
    countries,
  ]);

  colorScale.domain([0, maxVal]);

  const [newWidth, newHeight] = size;

  return (
    <div>
      <Globe
        width={newWidth}
        height={newHeight}
        globeImageUrl="./earth-blue-marble.jpg"
        backgroundImageUrl="./night-sky.png"
        lineHoverPrecision={0}
        polygonsData={countries.features.filter(
          d => d.properties.ISO_A2 !== 'AQ'
        )}
        polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={d =>
          d === hoverD ? 'steelblue' : colorScale(getVal(d))
        }
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties: d }) =>
          `<b>${d.ADMIN} (${d.ISO_A2}):</b> <br />`
        }
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}

// GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
// Population: <i>${d.POP_EST}</i>
