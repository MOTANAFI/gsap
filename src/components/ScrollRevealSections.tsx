import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollRevealSections() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[i] = el;
  };
  return (
    <div className="min-h-screen bg-gray-100 text-center space-y-40 py-40">
      {["Scroll", "Reveal", "Sections"].map((text, i) => (
        <div key={i} ref={setRef(i)}
         className="h-screen text-5xl font-bold flex items-center justify-center bg-white shadow-lg"
        >
          {text}
        </div>
      ))}
    </div>
  );
}

export default ScrollRevealSections;
