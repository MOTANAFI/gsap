import gsap from "gsap";
import { useRef } from "react";

function MultiFlipCardStagger() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const  isFlipped = useRef(false);

    const handleFlipAll = () => {
        isFlipped.current = !isFlipped.current;
         gsap.to(cardRefs.current, {
      rotateY: isFlipped.current ? 180 : 0,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.2, // Delay between each card
    });
    }
  return (
     <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gray-100 p-10">
      <button
        onClick={handleFlipAll}
        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md"
      >
        {isFlipped.current ? "Unflip All Cards" : "Flip All Cards"}
      </button>

      <div className="flex flex-wrap gap-6 justify-center">
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ perspective: "1000px" }}>
            <div
            //   ref={(el) => (cardRefs.current[i] = el)}
               ref={(el) => {
              cardRefs.current[i] = el;
            }}
              className="relative w-64 h-40 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s ease",
              }}
            >
              {/* Front */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute w-full h-full bg-indigo-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
              >
                Card {i + 1}
              </div>
              {/* Back */}
              <div
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
                className="absolute w-full h-full bg-pink-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
              >
                Back {i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiFlipCardStagger