import gsap from "gsap";
import { useEffect, useRef } from "react";


function GsapTimeline() {
    const boxRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const currentBox = boxRef.current;
        if (currentBox) {
            const tl = gsap.timeline({defaults: {ease: "power2.out", duration: 1}});

            tl.from(currentBox, {x:-200, opacity:0})
            .to(currentBox, {rotate: 360, repeat: 1, yoyo: true})
            .to(currentBox, {scale: 1.5})
            .to(currentBox, {x: 0, scale: 1,  rotate: "360_short" })

        }
    },[])
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        <div ref={boxRef} className="w-24 h-24 bg-yellow-500 rounded-lg shadow-lg"></div>
    </div>
  )
}

export default GsapTimeline