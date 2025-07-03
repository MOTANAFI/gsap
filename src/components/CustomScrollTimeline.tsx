import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function CustomScrollTimeline() {
    const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: true,
        // pin: true,
        markers: true,
      },
    });
    // Clear timeline and build custom animation
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      if (i === 0) {
        tl.from(section, {
          x: -300,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      } else if (i === 1) {
        tl.from(section, {
          y: 200,
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        });
      } else if (i === 2) {
        tl.from(section, {
          rotate: 180,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1,0.3)",
        });
      } else if (i === 3) {
        tl.from(section, {
          x: 300,
          y: 100,
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "expo.out",
        });
      }
    });
  }, []);

  const getRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <div ref={containerRef}>
      {["One", "Two", "Three", "Four"].map((label, i) => (
        <section
          key={i}
          ref={getRef(i)}
          className={`h-screen flex items-center justify-center text-5xl font-bold ${
            i % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"
          } text-white`}
        >
          Section {label}
        </section>
      ))}
    </div>
  );
}

export default CustomScrollTimeline;
