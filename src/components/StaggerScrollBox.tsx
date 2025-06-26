import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react"


function StaggerScrollBox() {
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const currentBoxes = boxesRef.current;
    
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
    
        gsap.from(currentBoxes, {
            scrollTrigger: {
                trigger: currentBoxes[0],
                start: "top 80%",
                toggleActions: "play none none none",
                markers: true,
             },
             y:100,
             opacity:0,
             duration:1,
             stagger:0.2,
             ease:"power2.out" // Optional: for debugging
            
        })
    },[])
  return (
    <div className="min-h-[300vh] bg-gray-100 px-4 py-32 flex flex-col items-center">
        <h1>Scroll down to see the staggered box boxes</h1>
        <div className="h-[150vh]"></div>
        <div className="flex justify-center gap-8">
           {[...Array(4)].map((_,i) => (
            <div
            key={i}
            ref={el => {
                if(el) boxesRef.current[i] = el;
            }}
            className="w-24 h-24 bg-purple-500 rounded-lg shadow-lg"
            ></div>
           ))}
        </div>
       
    </div>
  )
}

export default StaggerScrollBox