import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function DynamicBackgroundScroll() {
     const sectionsRef = useRef<HTMLDivElement[]>([]);

      useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        const bgColor = section.dataset.bg || "#ffffff";

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to("body", { backgroundColor: bgColor, duration: 0.5 }),
          onEnterBack: () => gsap.to("body", { backgroundColor: bgColor, duration: 0.5 }),
        });
      });
    });

    return () => ctx.revert();
  }, []);


     const setRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[i] = el;
  };
  return (
     <div className="text-white text-4xl font-bold text-center space-y-40 py-40">
      {[
        { text: "Welcome", bg: "#1e293b" }, // slate
        { text: "Scroll Down", bg: "#dc2626" }, // red
        { text: "Almost There", bg: "#2563eb" }, // blue
        { text: "Done", bg: "#16a34a" }, // green
      ].map((section, i) => (
        <div
          key={i}
          ref={setRef(i)}
          data-bg={section.bg}
          className="h-screen flex items-center justify-center"
        >
          {section.text}
        </div>
      ))}
    </div>
  )
}

export default DynamicBackgroundScroll