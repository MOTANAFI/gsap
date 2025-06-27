import { gsap } from "gsap";
import { useRef } from "react";

function Gsap3DBox() {
  const boxRef = useRef<HTMLDivElement | null>(null);

   const handleEnter = () => {
    gsap.to(boxRef.current, {
      rotateY: 180, // or rotationY (either works in GSAP)
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleLeave = () => {
    gsap.to(boxRef.current, {
      rotateY: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
          <div
            ref={boxRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="w-40 h-40 bg-indigo-500 text-white rounded-lg shadow-lg transform-style-preserve-3d transition-transform"
          >
            <div className="p-4 text-center pt-16">3D Flip Me</div>
          </div>
        </div>
      </div>
    );
  };


export default Gsap3DBox;
