import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

export default function World({
  parentCallback,
  openSideBar,
  countriesAPI,
  goodCountry,
}) {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [size, setSize] = useState([0, 0]);
  const [clickLocation, setClickLocation] = useState({ lat: 0, lng: 0 }); // les coords du pays clické
  const [arcData, setArcData] = useState([]);
  const countriesDataURL = './ne_110m_admin_0_countries.geojson';
  const geoLocationURL = 'https://geolocation-db.com/json/';
  const countrieFlagURL = 'https://restcountries.eu/data/';

  // load data
  useEffect(() => {
    // load countries data (src: http://geojson.xyz/)
    fetch(countriesDataURL)
      .then(res => res.json())
      .then(setCountries);
    // auto rotation of the globe
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = -0.2;
    fetch(geoLocationURL)
      .then(res => res.json())
      .then(data => {
        globeRef.current.pointOfView(
          { lat: data.latitude, lng: data.longitude, altitude: 3 },
          5000
        );
      });
  }, []);

  useEffect(() => {
    console.log(clickLocation);
    globeRef.current.pointOfView(
      {
        lat: clickLocation.lat,
        lng: clickLocation.lng,
        altitude: 2,
      },
      2500
    );
    console.log(goodCountry);
    if (goodCountry && goodCountry.latlng) {
      setArcData([
        {
          startLat: clickLocation.lat,
          startLng: clickLocation.lng,
          endLat: goodCountry.latlng[0], // -34.0
          endLng: goodCountry.latlng[1], // -64.0
          color: [
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
            ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ],
        },
      ]);
    }
  }, [clickLocation]);

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

  // TODO GDP per capita (avoiding countries with small pop) = PIB par habitant
  const getVal = feat =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(() => Math.max(...countries.features.map(getVal)), [
    countries,
  ]);

  colorScale.domain([0, maxVal]);

  const [newWidth, newHeight] = size; // adapter le globe à la taille de l'écran
  let flagScr; // lien vers l'image du drapeau d'un pays
  let tmpLocation;

  return (
    <Globe
      ref={globeRef}
      width={newWidth}
      height={newHeight}
      globeImageUrl="./earth-blue-marble.jpg"
      backgroundImageUrl="./bg.jpg"
      lineHoverPrecision={0}
      polygonsData={countries.features.filter(
        d => !['AQ', '-99'].includes(d.properties.ISO_A2)
      )}
      polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={d =>
        d === hoverD ? 'steelblue' : colorScale(getVal(d))
      }
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => {
        flagScr = `${countrieFlagURL}${d.ISO_A3.toLowerCase()}.svg`;
        return `<div class="p-1 w-20 h-auto bg-gray-500">
                  <b>${d.ADMIN}</b>
                  <img src="${flagScr}" alt="Flag" />
                </div>`;
      }}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onPolygonClick={({ properties: d }) => {
        try {
          // se déplace au coord enregistré dans les données
          tmpLocation = countriesAPI.find(item => item.alpha3Code === d.ISO_A3)
            .latlng;
          setClickLocation({ lat: tmpLocation[0], lng: tmpLocation[1] });
          openSideBar();
        } catch (err) {
          console.log(`[Err] Can't travel to here : ${err}`); // TypeError
        }

        parentCallback(d.ADMIN, d.ISO_A3);
      }}
      arcsData={arcData}
      arcColor="color"
      arcDashLength={0.95}
      arcDashGap={0.5}
      arcDashAnimateTime={2000}
      arcAltitude={0.5}
      arcStroke={1}
    />
  );
}

World.propTypes = {
  parentCallback: PropTypes.func.isRequired,
  openSideBar: PropTypes.func.isRequired,
  countriesAPI: PropTypes.shape.isRequired,
  goodCountry: PropTypes.arrayOf(PropTypes.string).isRequired,
};
