import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function TimelineScrubbingScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const box3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      tl.fromTo(
        box1Ref.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          box2Ref.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "+=0.5"
        )
        .fromTo(
          box3Ref.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          "+=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-[200vh] bg-black text-white flex flex-col items-center justify-center space-y-20 text-3xl px-4">
      <div ref={box1Ref} className="bg-red-500 p-10 rounded-lg shadow-lg">
        Box 1
      </div>
      <div ref={box2Ref} className="bg-blue-500 p-10 rounded-lg shadow-lg">
        Box 2
      </div>
      <div ref={box3Ref} className="bg-green-500 p-10 rounded-lg shadow-lg">
        Box 3
      </div>
    </div>
  );
}

export default TimelineScrubbingScroll;
