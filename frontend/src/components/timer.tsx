import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(0); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount

  }, []); // Empty dependency array ensures that useEffect runs only once on mount

  const formatTime = (time:any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default CountdownTimer;