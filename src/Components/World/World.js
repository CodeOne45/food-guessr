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

export default function World({ parentCallback, openSideBar }) {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [countriesName, setCountriesName] = useState([]);
  const [hoverD, setHoverD] = useState();
  const [size, setSize] = useState([0, 0]);
  const countriesDataURL = './ne_110m_admin_0_countries.geojson';
  const countriesNameURL = './restcountries_all.json';
  const geoLocationURL = 'https://geolocation-db.com/json/';
  const countrieFlagURL = 'https://restcountries.eu/data/';

  const currentDate = new Date();
  const isDayTime = currentDate.getHours() >= 6 && currentDate.getHours() <= 20;

  // load data
  useEffect(() => {
    // load countries data (src: http://geojson.xyz/)
    fetch(countriesDataURL)
      .then(res => res.json())
      .then(setCountries);
    // load countries name data (src: https://restcountries.eu/)
    fetch(countriesNameURL)
      .then(res => res.json())
      .then(setCountriesName);
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
  let clickLocation; // les coords du pays clické

  return (
    <Globe
      ref={globeRef}
      width={newWidth}
      height={newHeight}
      globeImageUrl="./earth-blue-marble.jpg"
      backgroundImageUrl={isDayTime ? './bg-day.png' : './bg-night.png'}
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
          clickLocation = countriesName.find(
            item => item.alpha3Code === d.ISO_A3
          ).latlng;
          // Se déplace à l'endroit indiqué par la souris
          // if (!clickLocation) {
          //   clickLocation = [
          //     globeRef.current.toGlobeCoords(e.x, e.y).lat,
          //     globeRef.current.toGlobeCoords(e.x, e.y).lng,
          //   ];
          // }
          // TODO travel to clicked country (Not optimized)
          globeRef.current.pointOfView(
            {
              lat: clickLocation[0],
              lng: clickLocation[1],
              altitude: 2,
            },
            2500
          );
          openSideBar();
        } catch (err) {
          console.log(`[Err] Can't travel to here : ${err}`); // TypeError
        }

        parentCallback(d.ADMIN, d.ISO_A3.toLowerCase());
      }}
    />
  );
}

World.propTypes = {
  parentCallback: PropTypes.func.isRequired,
  openSideBar: PropTypes.func.isRequired,
};
