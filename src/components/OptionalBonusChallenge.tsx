import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function OptionalBonusChallenge() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Clean previous triggers
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            markers: true,
          },
        }
      );
    });
  }, []);

  // 💡 Clear refs before rendering new DOM
  sectionsRef.current = [];

  const getRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <div>
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

export default OptionalBonusChallenge;
