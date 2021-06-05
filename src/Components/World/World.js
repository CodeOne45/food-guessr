import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';

// eslint-disable-next-line react/prop-types
export default function World({ parentCallback, openSideBar }) {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [size, setSize] = useState([0, 0]);
  // load data
  useEffect(() => {
    // src: http://geojson.xyz/
    fetch('./ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  // auto rotation of the globe
  useEffect(() => {
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = -0.2;
    globeRef.current.pointOfView({ altitude: 3 }, 5000);
  }, []);
  // responsive design for the globe
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
    <div id="world-3d">
      <Globe
        ref={globeRef}
        width={newWidth}
        height={newHeight}
        globeImageUrl="./earth-blue-marble.jpg"
        backgroundImageUrl="./bg.jpg"
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
        polygonLabel={({ properties: d }) => `<b>${d.ADMIN}</b> <br />`}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        onPolygonClick={(d, e) => {
          try {
            // TODO travel to clicked country (Not optimized)
            globeRef.current.pointOfView(
              {
                lat: globeRef.current.toGlobeCoords(e.x, e.y).lat,
                lng: globeRef.current.toGlobeCoords(e.x, e.y).lng,
                altitude: 1,
              },
              2500
            );
            openSideBar();
          } catch (err) {
            console.log(err); // TypeError
          }

          parentCallback(d.properties.ADMIN);
        }}
      />
    </div>
  );
}

// GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
// Population: <i>${d.POP_EST}</i>
