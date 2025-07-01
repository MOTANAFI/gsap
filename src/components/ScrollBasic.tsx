import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollBasic() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 100,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top bottom",
        end: "top 30%",
        toggleActions: "play none none reverse",
        markers: true, // show debug markers
      },
    });
  }, []);

  return (
    <div className="min-h-[200vh] bg-gray-100 p-20">
      <div
        ref={boxRef}
        className="w-32 h-32 bg-indigo-500 rounded-lg text-white flex items-center justify-center"
      >
        Scroll Me
      </div>
    </div>
  );
}

export default ScrollBasic;
