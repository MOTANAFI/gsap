import gsap from "gsap";
import { useRef } from "react";

function MultiFlipCard() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flipped = useRef<boolean[]>([]);
  const hovering = useRef<boolean[]>([]);
  const timeouts = useRef<(number | null)[]>([]);
  const handleClick = (index: number) => {
    flipped.current[index] = true;
    flipCard(index, 180);
    if (timeouts.current[index]) {
      clearTimeout(timeouts.current[index]!);
    }
    timeouts.current[index] = window.setTimeout(() => {
      if (!hovering.current[index]) {
        flipped.current[index] = false;
        flipCard(index, 0);
      }
    }, 1500);
  };

  const handleMouseEnter = (index: number) => {
    hovering.current[index] = true;
  }    
  const handleMouseLeave = (index: number) => {
    hovering.current[index] = false;
    if (flipped.current[index]) {
      flipped.current[index] = false;
      flipCard(index, 0);
    }
    
  }

  // function to flip the card
  const flipCard = (index: number, rotateY: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateY,
      duration: 0.6,
      ease: "power2.inOut",
    });
  };
  return (
    <div className="min-h-screen flex flex-wrap gap-6 justify-center items-center bg-gray-100 p-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ perspective: "1000px" }}>
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            className="relative w-64 h-40 cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease",
            }}
          >
            {/* Front  */}
            <div className="absolute w-full h-full bg-indigo-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold">
              Card {i + 1}
            </div>
            {/* Back  */}
            <div
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
              className="absolute w-full h-full bg-pink-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
            >
              Card {i + 1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultiFlipCard;
