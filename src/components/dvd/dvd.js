import React, { useRef, useState, useEffect } from 'react'
import thomasDvd from '../../thomas-dvd.png';
import './dvd.css';


function Dvd(props) {

  const imgRef = useRef(null);
  const [pos, setPos] = useState({left: Math.random() * 40, top: Math.random() * 100});
  const [vel, setVel] = useState({left: Math.random()*0.5 + 0.75, top: Math.random()*0.5 + 0.75});
  
  useInterval(() => {
    const width = imgRef.current.clientWidth;
    const height = imgRef.current.clientHeight;
    const parentWidth = imgRef.current.parentElement.clientWidth;
    const parentHeight = imgRef.current.parentElement.clientHeight;
    var velLeft = vel.left;
    var velTop = vel.top;
    if (pos.left + vel.left < 0) {
      velLeft = Math.abs(velLeft);
    } else if (pos.left + vel.left + width > parentWidth) {
      velLeft = -Math.abs(velLeft);
    }
    if (pos.top + vel.top < 0) {
      velTop = Math.abs(velTop);
    } else if (pos.top + vel.top + height > parentHeight - vel.top) {
      velTop = -Math.abs(velTop);
    }
    setPos({left: pos.left + velLeft, top: pos.top + velTop});
    setVel({left: velLeft, top: velTop});
  }, 15);

  return (
    <div className="Dvd-main">
      <img className="Dvd-image"
        src={thomasDvd}
        alt="Thomas Clavelli"
        style={{
          left: pos.left + "px",
          top: pos.top + "px"
        }}
        ref={imgRef}
      />
    </div>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Dvd;