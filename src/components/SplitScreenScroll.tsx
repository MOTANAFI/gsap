import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function SplitScreenScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
      // Pin the image 
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: imageRef.current
      })
    },sectionRef);

    return () => ctx.revert();
  }, []);
  const setTextRef = (i:number) => (el:HTMLDivElement | null) => {
    if(el) textsRef.current[i] = el

  }
  return (
    <div
    ref={sectionRef}
    className="h-[300vh] flex bg-gray-100 px-4 relative items-start"
    >
        {/* Left column: text */}
        <div className="w-1/2 py-40 space-y-24 sticky top-0">
          {["First Insight", "Second Insight", "Third Insight"].map((text, i) => (
          <div
            key={i}
            ref={setTextRef(i)}
            className="text-3xl font-bold opacity-0"
          >
            {text}
          </div>
        ))}
        </div>
         {/* Right column: pinned image */}
      <div
        ref={imageRef}
        className="w-1/2 h-screen flex items-center justify-center sticky top-0"
      >
        <img
          src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          alt="Abstract"
          className="rounded-lg shadow-lg max-h-[80%]"
        />
      </div>
    </div>
  )
}

export default SplitScreenScroll;
