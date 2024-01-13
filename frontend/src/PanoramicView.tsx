import React, { useRef, useEffect, useState } from 'react';
import './PanoramicView.css';

const PanoramicView: React.FC = () => {
  const panoramicRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialOffset, setInitialOffset] = useState(0);
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  const [speed, setSpeed] = useState(0);
  const acceleration = 0.1; // Adjust the acceleration factor as needed
  const maxSpeed = 5; // Adjust the maximum speed limit as needed

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      setInitialMouseX(e.clientX);
      setInitialOffset(backgroundOffset);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown && panoramicRef.current) {
        const deltaMouseX = e.clientX - initialMouseX;
        let deltaPercentage = (deltaMouseX / window.innerWidth) ;

        // Cap the speed to the maximum limit
        deltaPercentage = Math.max(-maxSpeed, Math.min(maxSpeed, deltaPercentage));

        // Update the background offset and speed
        setBackgroundOffset((prevOffset) => prevOffset + deltaPercentage);
        setSpeed(deltaPercentage);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMouseDown, initialMouseX, initialOffset, maxSpeed]);

  useEffect(() => {
    if (!isMouseDown && Math.abs(speed) > 0) {
      // Gradually slow down the speed over time
      const newSpeed = speed > 0 ? Math.max(0, speed - acceleration) : Math.min(0, speed + acceleration);
      setSpeed(newSpeed);
      setBackgroundOffset((prevOffset) => prevOffset + newSpeed);
    }
  }, [isMouseDown, speed, acceleration]);

  useEffect(() => {
    if (panoramicRef.current) {
      // Adjust the background position to create an infinite scrolling effect
      panoramicRef.current.style.backgroundPositionX = `${backgroundOffset}%`;
    }
  }, [backgroundOffset]);

  return <div className="panoramic-view" ref={panoramicRef}></div>;
};

export default PanoramicView;
