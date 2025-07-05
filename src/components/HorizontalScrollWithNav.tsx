import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
function HorizontalScrollWithNav() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalPanels = panelsRef.current.length;

      const horizontalTween = gsap.to(panelsRef.current, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          id: "nav-scroll",
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalPanels - 1),
          end: () => "+=" + containerRef.current!.offsetWidth,
        },
      });
      // Track active panel on scroll
      panelsRef.current.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          containerAnimation: horizontalTween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  const scrollToPanel = (i: number) => {
    // const container = containerRef.current;
    // if(!container || !panelsRef.current[i]) return;

    // const panelWidth = panelsRef.current[i].offsetWidth;
    // const scrollAmount = panelWidth * i
    const st = ScrollTrigger.getById("nav-scroll");
    if (!st || !st.animation) return;
    const progress = i / (panelsRef.current.length - 1);
    // st.animation?.pause()
    gsap.to(st.animation, {
      progress,
      duration: 1,
      ease: "power2.inOut",
      overwrite: true,
    });
  };
  const getPanelRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) panelsRef.current[i] = el;
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex space-x-4 bg-white p-2 rounded shadow-md">
        {["Zoom", "Slide", "Rotate", "Fade+Scale"].map((label, i) => (
          <button
            key={i}
            onClick={() => scrollToPanel(i)}
            className={`px-4 py-2 rounded font-medium transition ${
              activeIndex === i
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Spacer */}
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Scroll or use Nav
      </div>
      {/* Horizontal Scroll */}

      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="flex w-max h-full">
          {["Zoom", "Slide", "Rotate", "Fade+Scale"].map((text, i) => (
            <div
              key={i}
              ref={getPanelRef(i)}
              className={`w-screen h-full flex items-center justify-center text-5xl font-bold ${
                i % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"
              } text-white`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      {/* Done */}
      <div className="h-screen flex items-center justify-center text-3xl">
        Done with naivigation
      </div>
    </div>
  );
}

export default HorizontalScrollWithNav;
