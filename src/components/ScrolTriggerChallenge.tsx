import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);


function ScrolTriggerChallenge() {
     const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    //    const containerRef = useRef<HTMLDivElement | null>(null);


     useGSAP(() => {
        const currentCard = cardRefs.current;
        // const container = containerRef.current;
        // if(!container) return 
        currentCard.forEach((card, _) => {
            if(!card) return;
            gsap.fromTo(
                card, {
                    rotateY: 0
                },{
                    rotateY: 180,
                    duration: 0.6,
                    ease: "power2.inOut",
                    scrollTrigger:{
                        trigger: card,
                        start: "top 80%",
                        // scrub: true,
                        // // pin: true,
                        // markers: true
                        // toggleActions: "play none none reverse",
                    }
                }
            )
        })

     }, []);
  return (
     <div className="min-h-screen flex flex-wrap gap-6 justify-center items-center bg-gray-100 p-10">
            <div className="min-h-[300vh] py-40 flex flex-col items-center gap-32"></div>
        <div className="flex flex-wrap gap-6 justify-center min-h-[80%]">
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ perspective: "1000px" }}>
            <div
            //   ref={(el) => (cardRefs.current[i] = el)}
               ref={(el) => {
              cardRefs.current[i] = el;
            }}
              className="relative w-64 h-40 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.6s ease",
              }}
            >
              {/* Front */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute w-full h-full bg-indigo-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
              >
                Card {i + 1}
              </div>
              {/* Back */}
              <div
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
                className="absolute w-full h-full bg-pink-500 text-white rounded-xl shadow-lg flex items-center justify-center text-xl font-bold"
              >
                Back {i + 1}
              </div>
            </div>
          </div>
        ))}
        </div>
     </div>
  )
}

export default ScrolTriggerChallenge