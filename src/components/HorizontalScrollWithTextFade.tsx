import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HorizontalScrollWithTextFade() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const textsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalPanels = panelsRef.current.length;

      // horizontal panel scroll
      gsap.to(panelsRef.current, {
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
      // text fade in/out on each panel
      textsRef.current.forEach((el, i) => {
        if (!el || !panelsRef.current[i]) return;
        ScrollTrigger.create({
          trigger: panelsRef.current[i],
          containerAnimation: ScrollTrigger.getById("main-scroll")?.animation, // for smooth scroll syncing
          start: "left center",
          end: "right center",
          scrub: true,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(el, {
              opacity: progress < 0.5 ? progress * 2 : (1 - progress) * 2,
              duration: 0.1,
              ease: "none",
            });
          },
        });
      }, containerRef);
    });
    return () => ctx.revert();
  }, []);

  const getPanelRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) panelsRef.current[i] = el;
  };

  const getTextRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) textsRef.current[i] = el;
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Scroll to Slide 👉
      </div>

      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="flex w-max h-full">
          {["Explore", "Create", "Inspire", "Transform"].map((text, i) => (
            <div
              key={i}
              ref={getPanelRef(i)}
              className={`w-screen h-full flex items-center justify-center relative ${
                i % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"
              }`}
            >
              <div
                ref={getTextRef(i)}
                className="absolute text-white text-5xl font-extrabold opacity-0 transition-opacity duration-500"
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

export default HorizontalScrollWithTextFade;
