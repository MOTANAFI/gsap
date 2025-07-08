import gsap from "gsap";
import { useRef } from "react";

function HoverCards() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardRefs.current[index] = el;
  };

  const handleMouseEnter = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.05,
      y: -10,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-5xl mx-auto">
      {["React", "GSAP", "Tailwind"].map((title, i) => (
        <div
          key={i}
          ref={(el) => setCardRef(el, i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
          className="bg-white p-8 rounded-lg shadow transition-transform cursor-pointer text-center font-semibold text-xl"
        >
          {title}
        </div>
      ))}
    </div>
  );
}

export default HoverCards;
