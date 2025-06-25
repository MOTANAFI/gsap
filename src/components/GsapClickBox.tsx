
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function GsapClickBox() {
    const [visible, setVisible] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const toggleBox = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        const currentBox = boxRef.current;
        if(currentBox) {
            if(visible) {
                gsap.fromTo(currentBox,
                     {
                        x:-200, opacity:0

                },
                {
                    x:0, opacity:1, duration: 0.5, ease: "power2.Out"

                })
            }
        } else {
            gsap.to(currentBox, {
                x:200, opacity:0, duration: 0.5, ease: "power2.in"
            })
        }
        
    }, [visible])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
        <button
        onClick={toggleBox}
         className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform">
            {visible ? "Hide" : "Show"} Box
        </button>
        <div ref={boxRef} className="w-24 h-24 bg-green-500 rounded-lg shadow-xl" 
        style={{visibility: visible ? "visible" : "hidden"}}>

        </div>
    </div>
  )
}

export default GsapClickBox