import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HorizontalScrollCustomPanels() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalPanels = panelsRef.current.length;

      // Main horizontal scroll animation
      const horizontalAnime = gsap.to(panelsRef.current, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          id: "main-scroll",
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalPanels - 1),
          markers: true,
          end: () => "+=" + containerRef.current!.offsetWidth,
        },
      });
      // panel-speccific animations
      contentRef.current.forEach((el, i) => {
        if (!el || !panelsRef.current[i]) return;
        const baseTrigger = {
          trigger: panelsRef.current[i],
          containerAnimation: horizontalAnime, //  ScrollTrigger.getById("main-scroll")?.animation,
          start: "left center",
          end: "right center",
          scrub: true,
        };
        if (i === 0) {
          gsap.fromTo(
            el,
            {
              scale: 0.5,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                ...baseTrigger,
              },
            }
          );
        } else if (i === 1) {
          gsap.fromTo(
            el,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                ...baseTrigger,
              },
            }
          );
        } else if (i === 2) {
          gsap.fromTo(
            el,
            { rotateY: -90, opacity: 0 },
            {
              rotateY: 0,
              opacity: 1,
              transformPerspective: 1000,
              transformOrigin: "center center",
              scrollTrigger: {
                ...baseTrigger,
              },
            }
          );
        } else if (i === 3) {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                ...baseTrigger,
              },
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getPanelRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) panelsRef.current[i] = el;
  };

  const getContentRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) contentRef.current[i] = el;
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Scroll to Slide 👉
      </div>

      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="flex w-max h-full">
          {["Zoom", "Slide", "Rotate 3D", "Fade+Scale"].map((text, i) => (
            <div
              key={i}
              ref={getPanelRef(i)}
              className={`w-screen h-full flex items-center justify-center relative ${
                i % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"
              } preserve-3d`}
            >
              <div
                ref={getContentRef(i)}
                className="absolute text-white text-5xl font-extrabold opacity-100"
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-center text-3xl">
        🎉 Done scrolling horizontally!
      </div>
    </div>
  );
}

export default HorizontalScrollCustomPanels;
