import {gsap} from "gsap";
import { useRef } from "react";


function GsapHoverBox() {
    const boxRef = useRef<HTMLDivElement |null >(null);
    const handleMouseEnter = () => {
        const currentBox = boxRef.current;
        gsap.to(currentBox, {
            scale: 1.2,
            rotate: 15,
            skewX: 15,
            duration: 0.3,
            ease: "power1.inOut"
        })

    }
    const handleMouseLeave = () => {
        const currentBox = boxRef.current;
        gsap.to(currentBox, {
            scale: 1,
            rotate: 0,
            skewX: 0,
            duration: 0.3,
            ease: "power1.inOut"
        })

    }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
        <div
        ref={boxRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-24 h-28 bg-pink-500 rounded-lg shadow-xl cursor-pointer transition-transform"
        >

        </div>
        </div>
  )
}

export default GsapHoverBox