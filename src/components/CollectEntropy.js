import React, { useEffect, useMemo, useState } from 'react';
import { Random } from '../random';

export const CollectEntropy = props => {
  const { options, setData } = props;
  const [strokeDasharray, setStrokeDashArray] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const random = useMemo(() => new Random(), []);
  let events = 0;

  useEffect(() => {
    window.addEventListener('mousemove', addEntropy);
  }, []);

  const addEntropy = event => {
    events++;

    const clientX = event.clientX;
    const clientY = event.clientY;
    const timeStamp = event.timeStamp;
    const total = clientX + clientY + timeStamp;

    setStrokeDashArray(events);
    setPercentage(parseInt((events / 500) * 100), 0);

    random.addEntropy(total);

    if (events >= 500) {
      removeEvent();
    }
  };

  const removeEvent = () => {
    window.removeEventListener('mousemove', addEntropy);
    const data = random.generate(options);
    setData(data);
  };

  return (
    <div className="bg-black bg-opacity-80 fixed top-0 right-0 bottom-0 left-0 grid items-center justify-center">
      <div>
        <svg height="200" width="200">
          <circle
            style={{
              strokeDasharray: strokeDasharray,
              strokeDashoffset: '1000',
            }}
            cx="100"
            cy="100"
            r="80"
            stroke="#312e81"
            strokeWidth="3"
            fillOpacity="0"
          />
          <text
            style={{ fontSize: '2rem' }}
            x="50%"
            y="50%"
            textAnchor="middle"
            stroke="white"
            strokeWidth="1px"
            dy="0.6rem"
          >
            {percentage} %
          </text>
        </svg>
      </div>
    </div>
  );
};