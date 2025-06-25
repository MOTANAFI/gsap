import {gsap} from "gsap";
import { useEffect, useRef } from "react"

function GsapStaggerBox() {
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setBoxRef = (el: HTMLDivElement | null, index: number) => {
        if(el) boxRefs.current[index] = el;
    }
    useEffect(() => {
        gsap.from(boxRefs.current, {
            x:-100,
            opacity: 0,
            duration:1,
            ease: "power2.out",
            stagger:0.5
        })
    },[])
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="flex gap-6">
            {[...Array(3)].map((_, i) => (
                <div
                key={i}
                ref={el => setBoxRef(el, i)}
                 className="w-24 h-24 bg-indigo-500 rounded-lg shadow-lg"></div>)
            )}
        </div>
        </div>
  )
}

export default GsapStaggerBox