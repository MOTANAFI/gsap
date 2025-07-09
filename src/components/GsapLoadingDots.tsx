import gsap from "gsap";
import { useEffect, useRef } from "react"

function GsapLoadingDots() {
    const dotsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });

    dotsRef.current.forEach((dot, i) => {
      tl.to(
        dot,
        {
          y: -10,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        },
        i * 0.1 // stagger by 0.1s
      );
    });
  }, []);


    // const setDotRef = (el: HTMLDivElement, i: number) => {
    //     dotsRef.current[i] = el
    // }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex space-x-2">
            {[0,1,2].map((_,i) => (
                <div key={i} ref={el => {
                    if(el) dotsRef.current[i] = el
                }}
                className="w-4 h-4 bg-indigo-600 rounded-full"
                ></div>

            ))}
        </div>
        </div>
  )
}

export default GsapLoadingDots