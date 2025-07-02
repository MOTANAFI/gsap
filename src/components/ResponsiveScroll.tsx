import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ResponsiveScroll() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 786px)", () => {
      gsap.to(boxRef.current, {
        x: 300,
        backgroundColor: "#10b981",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          end: "+=300",
          scrub: true,
          markers: true,
        },
      });
    });

    // Mobile
    mm.add("(max-width: 767px)", () => {
      gsap.to(boxRef.current, {
        y: 300,
        backgroundColor: "#f43f5e",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          end: "+=300",
          scrub: true,
          markers: true,
        },
      });
    });

    // Optional: for all screen sizes
    mm.add("all", () => {
      console.log("✅ MatchMedia running on all devices");
    });

    return () => mm.revert();
  }, []);

//   useGSAP(() => {
//     const mm = gsap.matchMedia();
//     // @ts-ignore
//     mm.add({
//       //Desktop
//       "(min-width:786px)": () => {
//         gsap.to(boxRef.current, {
//           x: 300,
//           backgroundColor: "#10b981",
//           scrollTrigger: {
//             trigger: boxRef.current,
//             start: "top 80%",
//             end: "+=300",
//             scrub: true,
//             markers: true,
//           }
//         });
//       },
//       //Mobile 
//       "(max-width: 767px)": () => {
//         gsap.to(boxRef.current, {
//             y:300,
//             backgroundColor: "#f43f5e",
//             scrollTrigger: {
//                 trigger: boxRef.current,
//                 start: "top 80%",
//                 end: "+=300",
//                 scrub: true,
//                 markers: true
//             }
//         })
//       },
//       // ALL devices optional 
//       "all": () => {
//         console.log("runs on all screen sizes")
//       }
//     });
//     // clean up 
//     return () => mm.revert()
//   },[]);

  return (
    <div className="min-h-[200vh] bg-gray-100 p-10">
      <div
        ref={boxRef}
        className="w-32 h-32 bg-indigo-600 text-white flex items-center justify-center rounded-lg"
      >
        Resize Me
      </div>
    </div>
  );
}

export default ResponsiveScroll;
