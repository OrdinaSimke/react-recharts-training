import React, { useState, useEffect, useMemo, useRef } from 'react';
import LineChart from './D3Line/D3Line';

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

export default function App() {
  const [marker, setMarker] = useState(10);
  const chartRef = useRef();

  useEffect(() => {
    chartRef.current.setMarker(marker);
    chartRef.current.setColor(marker);
  }, [marker]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMarker((prevMarker) => (prevMarker + 10 > 100 ? 10 : prevMarker + 10));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const currentTime = new Date().toISOString();

  const chart = useMemo(() => {
    return <LineChart ref={chartRef} data={data} width={500} height={400} />;
  }, [data]);

  /* global renders2:writable, timeStart2:writable */

  return (
    <div id="root-container">
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        renders: {renders2}
        <br />
        start: {timeStart2}
        <br />
        now: {currentTime}
      </div>
      {chart}
    </div>
  );
}
