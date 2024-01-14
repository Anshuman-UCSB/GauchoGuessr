import React, { useState, useEffect } from 'react';

type timerProps = {
    handleTime: (time: number) => void;
    reset: boolean;
}

const CountdownTimer: React.FC<timerProps> = ({handleTime, reset}) => {
  const [seconds, setSeconds] = useState(0); // 5 minutes in seconds

  useEffect(() => {
    if (reset) {
        setSeconds(0);
    } else {
    const interval = setInterval(() => {
            handleTime(seconds);
            setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000) ;

    return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [reset]); // Empty dependency array ensures that useEffect runs only once on mount

  const formatTime = (time:any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <h2>{formatTime(seconds)}</h2>
    </div>
  );
};

export default CountdownTimer;