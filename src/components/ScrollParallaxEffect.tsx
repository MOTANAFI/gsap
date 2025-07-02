import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function ScrollParallaxEffect() {
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    boxesRef.current.forEach((box, index) => {
      if (!box) return;
      gsap.to(box, {
        x: (index + 1) * 100,
        opacity: 1,
        scrollTrigger: {
          trigger: box,
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: true,
        },
      });
    });
  }, []);
  return (
    <div className="min-h-[200vh] bg-gray-100 p-20">
      <div ref={containerRef} className="flex flex-col gap-10 items-start">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            // ref={(el) => el && (boxRefs.current[i] = el)}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="w-32 h-32 bg-indigo-600 opacity-0 text-white rounded-lg flex items-center justify-center"
          >
            Box {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollParallaxEffect;
