import gsap from "gsap";
import { useRef } from "react";

function FlipCardClick() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isFlipped = useRef<boolean>(false);
  const handleClick = () => {
    
        isFlipped.current = !isFlipped.current;
        gsap.to(cardRef.current, {
          rotateY: isFlipped.current ? 180 : 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
        return isFlipped.current;
    
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div style={{ perspective: "1000px" }}>
        <div
          ref={cardRef}
          onClick={handleClick}
          className="relative w-64 h-40 cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease",
            }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute w-full h-full bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold"
          >
            Front!!
          </div>
          {/* Back */}
          <div
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
            className="absolute w-full h-full bg-pink-500 text-white rounded-lg shadow-lg flex items-center justify-center text-xl font-bold"
          >
            {" "}
            Back Side
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCardClick;
