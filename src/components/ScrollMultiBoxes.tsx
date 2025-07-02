import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function ScrollMultiBoxes() {
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    // reverse back animation 
    const ctx = gsap.context(() => {

      gsap.fromTo(boxesRef.current, {
        x:-200,
        opacity: 0,
        backgroundColor: "#6366f1",
        scale:0.5,
        rotate: 0
        
      }, {
        x:200,
        opacity:1,
        backgroundColor: "#10b981",
        scale: 1.3,
        rotate: 360,
        stagger: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end:"+=1000",
          scrub:true,
          pin:true,
          markers: true
        }
        
      })
      // gsap.to(boxesRef.current, {
        //   x: 200,
        //   opacity: 1,
        //   backgroundColor: "#10b981",
        //   scale: 1.3,
        //   rotate: 360,
        //   stagger: 0.2,
        //   ease: "power2.inOut",
        //   scrollTrigger: {
          //     trigger: sectionRef.current,
          //     start: "top center",
          //     end: "+=1000",
          //     scrub: true,
          //     pin: true,
          //     markers: true,
          //   },
          // });
        })
        return () => ctx.revert() // clean up scrollTriger + animation
  }, []);
  return (
    <div className="bg-gray-100">
      <div className="min-h-[100vh] flex items-center justify-center text-2xl font-bold">
        Scroll Down 👇
      </div>

      <section
        ref={sectionRef}
        className="h-[100vh] flex gap-4 justify-center items-center"
      >
        {
            // clean up the refs before assigning new ones 
            (boxesRef.current = [])
        }
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="w-24 h-24 opacity-0 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
          >
            Box {i + 1}
          </div>
        ))}
      </section>

      <div className="min-h-[100vh] flex items-center justify-center text-2xl">
        🎉 Done scrolling!
      </div>
    </div>
  );
}

export default ScrollMultiBoxes;
