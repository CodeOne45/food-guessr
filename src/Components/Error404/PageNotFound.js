import React from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';

const { useState, useEffect } = React;

const colorScale = d3.scaleOrdinal([
  'orangered',
  'mediumblue',
  'darkgreen',
  'yellow',
]);

const labelsTopOrientation = new Set([
  'Apollo 12',
  'Luna 2',
  'Luna 20',
  'Luna 21',
  'Luna 24',
  'LCROSS Probe',
]); // avoid label collisions

export default function PageNotFound() {
  const [landingSites, setLandingSites] = useState([]);

  useEffect(() => {
    fetch('./moon_landings.json')
      .then(r => r.json())
      .then(setLandingSites);
  }, []);

  return (
    <div id="error404">
      <Globe
        globeImageUrl="./404-error.jpg"
        backgroundImageUrl="./bg_moon.png"
        showGraticules
        labelsData={landingSites}
        labelText="label"
        labelSize={1.7}
        labelDotRadius={0.4}
        labelDotOrientation={d =>
          labelsTopOrientation.has(d.label) ? 'top' : 'bottom'
        }
        labelColor={d => colorScale(d.agency)}
        labelLabel={d => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
      `}
        onLabelClick={d => window.open(d.url, '_blank')}
      />
    </div>
  );
}
