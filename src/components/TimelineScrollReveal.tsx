import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function TimelineScrollReveal() {
    const sectionsRef = useRef<HTMLDivElement[]>([])

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionsRef.current[0],
                start: "top top",
                end: "+=2000",
                scrub: true,
                pin: true,
                markers: true
            }
        })
        tl.from(sectionsRef.current, {
            opacity: 0,
            y:100,
            scale:0.8,
            stagger:0.3,
            duration:1,
            ease: "power2.out"
        })

    },[])

    
  const getRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[index] = el;
  };
  return (
    <div>
        {(sectionsRef.current = [])}
        {['Alpha', 'Beta', 'Gama', 'Delta' ].map((text, i) => (
            <section
            key={i}
            ref={getRef(i)}
            className={`h-screen flex items-center justify-center text-5xl font-bold ${
                i % 2 === 0 ? "bg-indigo-600" : "bg-rose-600"} text-white`}
            >
                Section {text}
            </section>
        ))}

    </div>
  )
}

export default TimelineScrollReveal