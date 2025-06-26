import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function GsapScrollTrigger() {
  const boxRef = useRef(null);

  useGSAP(() => {
    gsap.from(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });
  }, []); // empty dependency array = runs once

  return (
    <div className="min-h-[300vh] bg-gray-100 px-4 py-32">
      <h1 className="text-center text-3xl font-bold mb-40 text-gray-700">
        Scroll down to see the animation
      </h1>

      <div className="h-[150vh]"></div>

      <div
        ref={boxRef}
        className="mx-auto w-32 h-32 bg-purple-500 rounded-lg shadow-lg"
      ></div>
    </div>
  );
}

export default GsapScrollTrigger;

/// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {  useRef, useLayoutEffect } from "react";

// gsap.registerPlugin(ScrollTrigger);

// function GsapScrollTrigger() {
//   const boxRef = useRef<HTMLDivElement | null>(null);
//   useLayoutEffect(() => {
//     if (!boxRef.current) return;
//      console.log("ScrollTrigger initialized"); // Debug line
//     gsap.from(boxRef.current, {
//       scrollTrigger: {
//         trigger: boxRef.current,
//         start: "top bottom", // Trigger when the top of the box is at 80% of the viewport height
//         toggleActions: "play reverse play reverse", // Play the animation when the trigger is reached
//       },
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       ease: "power2.out",
//     });
//   }, []);
//   return (
//       <div className="min-h-[300vh] bg-gray-100 px-4 py-32">
//       <h1 className="text-center text-3xl font-bold mb-40 text-gray-700">
//         Scroll down to see the animation
//       </h1>

//       {/* Spacer */}
//       <div className="h-[150vh]"></div>

//       {/* Animated Box */}
//       <div
//         ref={boxRef}
//         className="mx-auto w-32 h-32 bg-purple-500 rounded-lg shadow-lg"
//       ></div>
//     </div>
//   );
// }

// export default GsapScrollTrigger;
