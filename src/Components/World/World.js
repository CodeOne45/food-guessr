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
  parentCallback, // set player choice, iso a3 & distance
  openSideBar,
  countriesAPI,
  goodCountry,
  isShowArc,
}) {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [size, setSize] = useState([0, 0]);
  const [clickLocation, setClickLocation] = useState({ lat: 0, lng: 0 }); // les coords du pays clické
  const [arcData, setArcData] = useState([]);
  const countriesDataURL = './ne_110m_admin_0_countries.geojson';
  const geoLocationURL = 'https://geolocation-db.com/json/';
  // const countrieFlagURL = 'https://restcountries.eu/data/'; // activate to [Get Flag] under mouse

  const currentDate = new Date();
  const isDayTime = currentDate.getHours() >= 6 && currentDate.getHours() <= 20;

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

  /**
   * Set arc data with good format
   * @param {*} srtLat start latitude
   * @param {*} srtLng start longitude
   * @param {*} eLat ending latitude
   * @param {*} eLng ending longitude
   */
  const setArcDataFunc = (srtLat, srtLng, eLat, eLng) => {
    setArcData([
      {
        startLat: srtLat,
        startLng: srtLng,
        endLat: eLat, // -34.0
        endLng: eLng, // -64.0
        color: [
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
          ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        ],
      },
    ]);
  };

  useEffect(() => {
    globeRef.current.pointOfView(
      {
        lat: clickLocation.lat,
        lng: clickLocation.lng,
        altitude: 2,
      },
      2500
    );
    if (goodCountry && goodCountry.latlng) {
      setArcDataFunc(
        clickLocation.lat,
        clickLocation.lng,
        clickLocation.lat,
        clickLocation.lng
      );
    } else {
      setArcData([]);
    }
  }, [clickLocation]);

  useEffect(() => {
    if (isShowArc) {
      try {
        setArcDataFunc(
          clickLocation.lat,
          clickLocation.lng,
          goodCountry.latlng[0],
          goodCountry.latlng[1]
        );
      } catch (error) {
        console.log(`Fail sho arc : ${error}`);
      }
    }
  }, [isShowArc]);

  /**
   * Haversine formula to calculate the distance between 2 points on a sphere with their latitudes & longitudes.
   * This is not the exact measurement because the formula assumes that the Earth is a perfect sphere when in fact it is an oblate spheroid.
   * (Source : geeksforgeeks.org)
   * @param {*} lat1 latitude of the first point
   * @param {*} lon1 longitude of the first point
   * @param {*} lat2 latitude of the second point
   * @param {*} lon2 longitude of the second point
   * @return the distante between 2 points in Kilometer
   */
  function haversine(lat1, lon1, lat2, lon2) {
    // distance between latitudes & longitudes
    const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    const dLon = ((lon2 - lon1) * Math.PI) / 180.0;

    // convert to radians
    const lat1Bis = (lat1 * Math.PI) / 180.0;
    const lat2Bis = (lat2 * Math.PI) / 180.0;

    // apply formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1Bis) * Math.cos(lat2Bis);
    const rad = 6371;
    const c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }

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
  // let flagScr; // [Get Flag] lien vers l'image du drapeau d'un pays

  return (
    <Globe
      ref={globeRef}
      width={newWidth}
      height={newHeight}
      globeImageUrl="./earth-blue-marble.jpg"
      backgroundImageUrl={isDayTime ? './bg-day.jpg' : './bg-night.png'}
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
      polygonLabel={({ properties: d }) =>
        // flagScr = `${countrieFlagURL}${d.ISO_A3.toLowerCase()}.svg`; // [Get Flag]
        // return `<div class="p-1 w-28 h-auto bg-gray-500">
        //           <b class="text-sm">${d.ADMIN}</b>
        //           <img src="${flagScr}" alt="Flag" />
        //         </div>`;
        `<div class="p-1 w-28 h-auto bg-gray-500">
                  <b class="text-sm">${d.ADMIN}</b>
                </div>`
      }
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onPolygonClick={({ properties: d }) => {
        try {
          // se déplace au coord enregistré dans les données
          const tmpCountry = countriesAPI.find(
            item => item.alpha3Code === d.ISO_A3
          );
          const tmpLocation = tmpCountry.latlng;
          setClickLocation({ lat: tmpLocation[0], lng: tmpLocation[1] });
          openSideBar();
          const distance = Math.round(
            haversine(
              tmpLocation[0],
              tmpLocation[1],
              goodCountry.latlng[0],
              goodCountry.latlng[1]
            )
          );
          const cName = tmpCountry.translations
            ? tmpCountry.translations.fr
            : d.ADMIN;
          parentCallback(cName, d.ISO_A3, distance);
        } catch (err) {
          console.log(`[Err] Can't travel to here : ${err}`); // TypeError
        }
      }}
      arcsData={arcData}
      arcColor="color"
      arcDashLength={0.95}
      arcDashGap={0.5}
      arcDashAnimateTime={2000}
      arcAltitude={0.8}
      arcStroke={1}
    />
  );
}

World.propTypes = {
  parentCallback: PropTypes.func.isRequired,
  openSideBar: PropTypes.func.isRequired,
  countriesAPI: PropTypes.shape.isRequired,
  goodCountry: PropTypes.shape.isRequired,
  isShowArc: PropTypes.bool.isRequired,
};
