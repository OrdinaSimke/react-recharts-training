import React, { useState, useEffect } from 'react';
import { D3Line } from './D3Line/D3Line';

const data = [
  [1, 1],
  [12, 20],
  [24, 36],
  [32, 50],
  [40, 70],
  [50, 100],
  [55, 106],
  [65, 123],
  [73, 130],
  [78, 134],
  [83, 136],
  [89, 138],
  [100, 140],
];

export const D3App = (props) => {
  const [marker, setMarker] = useState(10);
  const [timeStart, setTimeStart] = useState(null);

  useEffect(() => {
    setTimeStart(new Date().toISOString());

    const intervalId = setInterval(() => {
      setMarker((prevMarker) => (prevMarker + 10 > 100 ? 10 : prevMarker + 10));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentTime = new Date().toISOString();

  /* global renders:writable, timeStart:writable */

  return (
    <div id="root-container">
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        renders: {renders}
        <br />
        start: {timeStart}
        <br />
        now: {currentTime}
      </div>
      <D3Line data={data} width={500} height={400} marker={marker} />
    </div>
  );
};
