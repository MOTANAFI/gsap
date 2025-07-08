// import gsap from "gsap";
// import { useEffect, useRef, useState } from "react";

// function GsapCarousel() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const slidesRef = useRef<HTMLDivElement[]>([]);
//   const [current, setCurrent] = useState(0);
//   const totalSlides = 3;

//   const nextSlide = () => {
//     const next = (current + 1) % totalSlides;
//     goToSlide(next);
//   };
//   const prevSlide = () => {
//     const next = (current - 1 + totalSlides) % totalSlides;
//     goToSlide(next);
//   };

//   const goToSlide = (index: number) => {
//     gsap.to(slidesRef.current, {
//       xPercent: -100 * index,
//       duration: 0.6,
//       ease: "power2.inOut",
//     });
//     setCurrent(index);
//   };

//   const setRef = (el: HTMLDivElement | null, i: number) => {
//     if (el) slidesRef.current[i] = el;
//   };
//   useEffect(() => {
//     gsap.set(slidesRef.current, {
//       xPercent: (i) => i * 100,
//     });
//   }, []);
//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-gray-100">
//       <div
//         ref={containerRef}
//         className="w-full h-full flex"
//         style={{ touchAction: "pan-y" }}
//       >
//         {["Slide One", "Slide Two", "Slide Three"].map((text, i) => (
//           <div
//             key={i}
//             ref={(el) => setRef(el, i)}
//             className="w-full flex items-center justify-center text-5xl font-bold bg-indigo-500 text-white"
//           >
//             {text}
//           </div>
//         ))}
//       </div>
//       {/* Controls */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
//         <button
//           onClick={prevSlide}
//           className="px-4 py-2 bg-white  text-black rounded shadow"
//         >
//           Prev
//         </button>
//         <button
//           onClick={nextSlide}
//           className="px-4 py-2 bg-white  text-black rounded shadow"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default GsapCarousel;

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function GsapCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    const next = (current + 1) % totalSlides;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (current - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  };

  const goToSlide = (index: number) => {
    if (!trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -100 * index,
      duration: 0.6,
      ease: "power2.inOut",
    });

    setCurrent(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Track that moves */}
      <div
        ref={trackRef}
        className="flex w-full h-full"
        style={{ width: `${100 * totalSlides}%` }}
      >
        {["Slide One", "Slide Two", "Slide Three"].map((text, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 flex items-center justify-center text-5xl font-bold bg-indigo-500 text-white"
            style={{ width: `${100 / totalSlides}%` }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={prevSlide}
          className="px-4 py-2 bg-white text-black rounded shadow"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 bg-white text-black rounded shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GsapCarousel;
