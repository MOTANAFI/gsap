import gsap from "gsap";
import { useRef } from "react";

function FlipCardAuto() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isFlipped = useRef<boolean>(false);
  const isHovering = useRef<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const flipTo = (rotateY: number) => {
    gsap.to(cardRef.current, {
      rotateY,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };

  const handleClick = () => {
    // Cancel previous timeout if exists
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    isFlipped.current = true;
    flipTo(180);

    timeoutRef.current = window.setTimeout(() => {
      if (!isHovering.current) {
        isFlipped.current = false;
        flipTo(0);
      }
    }, 1500);
  };
  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    if (isFlipped.current) {
      flipTo(0);
      isFlipped.current = false;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div style={{ perspective: "1000px" }}>
        <div
          ref={cardRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
            Back Side
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCardAuto;
