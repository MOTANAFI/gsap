import  { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);


function ScrollingTimeLine() {

      const containerRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current, 
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            markers: true
        }
    })
    tl.from(boxesRef.current, {
         opacity: 0,
      y: 100,
      scale: 0.5,
      rotate: -90,
      stagger: 0.3,
      ease: "power2.out",
    })
  },[])

  return (
     <div className="bg-gray-100">
      <div className="min-h-[100vh] flex items-center justify-center text-2xl font-bold">
        Scroll Down 👇
      </div>

      <section
        ref={containerRef}
        className="h-[100vh] flex gap-4 justify-center items-center"
      >
       
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            // ref={(el) => el && (boxesRef.current[i] = el)}
             ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="w-24 h-24 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
          >
            Box {i + 1}
          </div>
        ))}
      </section>

      <div className="min-h-[100vh] flex items-center justify-center text-2xl">
        🎉 Done scrolling!
      </div>
    </div>
  )
}

export default ScrollingTimeLine