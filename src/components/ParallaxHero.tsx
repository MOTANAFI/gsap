import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);


   useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000",
        scrub: true,
        markers: true,
      },
    });

    tl.to(bgRef.current, {
      y: -100,
      ease: "none",
    }, 0);

    tl.fromTo(titleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, ease: "power2.out" },
      0
    );
  }, []);
  return (
    <section ref={containerRef} className="relative h-[200vh] overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')`,
        }}
      />

      <h1
        ref={titleRef}
        className="text-white text-6xl md:text-8xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
      >
        Scroll to Animate
      </h1>
    </section>
  );
}

export default ParallaxHero;
