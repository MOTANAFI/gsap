import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function SplitScreenScrollAnimated() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [images] = useState([
    "https://images.unsplash.com/photo-1749741322727-3c51c6b41903?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
  ]);
  useEffect(() => {
    // ✅ Preload images to prevent flicker during scroll-triggered swaps
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const ctx = gsap.context(() => {
      textsRef.current.forEach((textEl, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top top",
            end: "top center",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          textEl,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        )
          .to(
            imageRef.current,
            {
              opacity: 0,
              scale: 1.1,
              duration: 0.3,
              onComplete: () => {
                if (imageRef.current) {
                  imageRef.current.src = images[i];
                }
              },
            },
            "-=0.3"
          )
          .fromTo(
            imageRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
          );
      });
      // pin the image column
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-image",
        scrub: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [images]);

  const setTextRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) textsRef.current[i] = el;
  };

  return (
    <div
      ref={sectionRef}
      className="h-[300vh] flex bg-gray-100 px-4 relative items-start"
    >
      {/* Left column: Text */}
      <div className="w-1/2 py-40 space-y-48">
        {["Nature is Healing", "Tech is Evolving", "Space is Expanding"].map(
          (text, i) => (
            <div
              key={i}
              ref={setTextRef(i)}
              className="text-4xl font-bold opacity-0"
            >
              {text}
            </div>
          )
        )}
      </div>

      {/* Right column: Image changes on scroll */}
      <div className="w-1/2 h-screen flex items-center justify-center pinned-image sticky top-0">
        <img
          ref={imageRef}
          src={images[0]}
          alt="Scroll Visual"
          className="rounded-lg shadow-lg max-h-[80%] object-cover transition duration-500"
        />
      </div>
    </div>
  );
}

export default SplitScreenScrollAnimated;
