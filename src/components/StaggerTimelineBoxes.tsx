import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function StaggerTimelineBoxes() {
  const boxesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const currentBoxes = boxesRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: boxesRef.current[0],
        start: "top 80%",
        toggleActions: "play none none none",
        markers: true,
      },
    });
    tl.from(currentBoxes, {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out", // Optional: for debugging
    }).to(currentBoxes, {
      scale: 1.1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  }, []);
  return (
    <div className="min-h-[300vh] bg-gray-100 px-4 py-32">
      <h1 className="text-center text-3xl font-bold mb-40 text-gray-700">
        Scroll down for timeline + stagger
      </h1>

      <div className="h-[150vh]"></div>

      <div className="flex justify-center gap-8">
        {[...Array(4)].map((_,i) => (
            <div  
            key={i}
            ref={el => {
                if(el) boxesRef.current[i] = el;
            }}
             className="w-24 h-24 bg-indigo-500 rounded-lg shadow-lg"></div>
            
        ))}
      </div>
    </div>
  );
}

export default StaggerTimelineBoxes;
