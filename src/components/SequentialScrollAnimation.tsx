
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function SequentialScrollAnimation() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const itemsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item) => {

                gsap.fromTo(item,
                    {
                        opacity:0,
                        y:50
                    },
                    {
                        opacity:1,
                        y:0,
                        // stagger:0.2,
                        duration:1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            end: "top 50%",
                            toggleActions: "play none none reverse"
                        }
                    })
                    }
                )

        },containerRef)
        return () => ctx.revert()

    },[])

    const setItemRef = (i:number) => (el: HTMLDivElement) => {
        if(el) itemsRef.current[i] = el;

    }
  return (
    <div className="min-h-screen bg-gray flex items-center justify-center px-4">
        <div ref={containerRef} className="max-w-3xl space-y-8">
            {["Step One", "Step 2", "Step Three", "Step Four"].map((text, i) => (
                <div
                key={i}
                ref={setItemRef(i)}
                 className="p-8 bg-white rounded shadow text-2xl font-semibold opacity-0"
                >{text}</div>
            ))}
        </div>
    </div>
  )
}

export default SequentialScrollAnimation