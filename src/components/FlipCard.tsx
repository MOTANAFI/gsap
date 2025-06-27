import { gsap } from "gsap";
import { useRef } from "react";

// Flip card hover
function FlipCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      rotateY: 180,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div style={{ perspective: "1000px" }}>
        <div
          ref={cardRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="relative w-64 h-40 transform-style-3d"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full bg-indigo-500 text-white rounded-lg shadow-lg flex items-center justify-center text-xl font-bold backface-hidden"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            Front
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-pink-500 text-white rounded-lg shadow-lg flex items-center justify-center text-xl font-bold rotateY-180 backface-hidden"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            Back
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
