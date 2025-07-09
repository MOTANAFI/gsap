import gsap from "gsap";
import { useRef } from "react";


function HoverButton() {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const handleEnter = () => {
        gsap.to(buttonRef.current, {
            scale:1.1,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            backgroundColor: "#4f46e5", // indigo-600
            duration:0.3,
            ease: "power2.out"

        })
    }
    const handleLeave = () => {
        gsap.to(buttonRef.current, {
            scale:1,
            boxShadow: "opx 4px 10px rgba(0,0,0,0.1)",
            backgroundColor: "#6366f1", // back to default
            duration:0.3,
            ease: "power2.out"

        })
    }
  return (
    <div
    className="min-h-screen flex items-center justify-center bg-gray-100" 
    >
        <button
        ref={buttonRef} 
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="px-6 py-3 text-white rounded-md shadow-md text-lg font-semibold transition-all"
        style={{backgroundColor: "#6366f1"}}
        >Hover Me</button>
    </div>
  )
}

export default HoverButton