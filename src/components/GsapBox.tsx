import {gsap} from "gsap";
import { useEffect, useRef } from "react";

function GsapBox() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        {
            x:-800,
            y:-300,
            opacity: 0,
            scale:0.2
        },
        
        {
            x:0,
            y:0,
            opacity:1,
            scale:3,
            duration: 1,
            ease: "bounce.out",
        }
      )
    }
        
   
  }, []);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div ref={boxRef} className="w-24 h-24 bg-purple-500 rounded shadow-lg"></div>
    </div>
  );
}

export default GsapBox;
