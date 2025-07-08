import gsap from "gsap";
import { useRef, useState } from "react";

function GsapAccordion() {
  const items = [
    {
      title: "What is GSAP?",
      content: "GSAP is a high-performance JavaScript animation library.",
    },
    {
      title: "Why use GSAP?",
      content:
        "It provides smooth, performant animations with full control and flexibility.",
    },
    {
      title: "Where is it used?",
      content: "Web apps, landing pages, banners, games, and more.",
    },
  ];
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    const current = contentRefs.current[index];
    if (!current) return;

    if (activeIndex === index) {
      // collapse
      gsap.to(current, {
        height: 0,
        duration: 0,
        ease: "power2.inOut",
      });
      setActiveIndex(null);
    } else {
      // collapse any open
      contentRefs.current.forEach((el, i) => {
        if (el && i !== index) {
          gsap.to(el, {
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });
      // expan selected
      gsap.set(current, {
        height: "auto", // get outo height
      });
      const fullHeight = current.scrollHeight;

      gsap.fromTo(
        current,
        {
          height: 0,
        },
        {
          height: fullHeight,
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
      setActiveIndex(index);
    }
  };

  const setRef = (el: HTMLDivElement | null, i: number) => {
    if (el) contentRefs.current[i] = el;
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-4 space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border rounded overflow-hidden">
          {/* <button
            className="w-full text-left px-4 py-3 bg-gray-100 font-semibold"
            onClick={() => toggleAccordion(i)}
          >
            {item.title}
          </button> */}
          <button
            className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-semibold"
            onClick={() => toggleAccordion(i)}
          >
            {item.title}
            <span>{activeIndex === i ? "−" : "+"}</span>
          </button>
          <div
            ref={(el) => setRef(el, i)}
            className="px-4 overflow-hidden text-gray-700"
            style={{ height: 0 }}
          >
            <div>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GsapAccordion;
