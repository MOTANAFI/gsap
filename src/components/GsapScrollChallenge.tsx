import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);
function GsapScrollChallenge() {
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=500", // optional, controls scroll area
                scrub: true,
                pin: true,
                markers: true, // for debugging
            },
        });
        tl.from(boxesRef.current, {
            y:100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
        })
        .to(boxesRef.current, {
            scale: 1.2,
            stagger: 0.2,
            duration: 0.4,
            ease:"back.out(1.7)"
        })
        .to(boxesRef.current, {
           rotate: 360,
              stagger: 0.2,
              duration: 0.4,
                ease: "power2.inOut",
        })
         .to(boxesRef.current, {
        boxShadow: "0px 20px 30px rgba(0,0,0,0.3)",
        stagger: 0.2,
        duration: 0.3,
        ease: "power1.out",
      });
    },[])
  return (
    <div className="min-h-[300vh] bg-gray-100 px-4 py-32">
      <h1 className="text-center text-3xl font-bold mb-40 text-gray-700">
        Scroll down to trigger the pinned challenge section
      </h1>

      <div className="h-[150vh]"></div>

      <section ref={sectionRef} className="bg-white py-20 px-8 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-10 text-indigo-700">
          🔥 Animated Section
        </h2>
        <div className="flex justify-center gap-8">
            {[...Array(4)].map((_,i) => (

          <div
          key={i}
            ref={el => {
                if(el) boxesRef.current[i] = el}}
           className="w-24 h-24 bg-indigo-500 rounded-lg shadow-md"></div>
            ))}
        </div>
      </section>

      <div className="h-[150vh]"></div>
    </div>
  );
}

export default GsapScrollChallenge;
