import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
gsap.registerPlugin(ScrollTrigger)


function ScrollScrapPin() {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  useGSAP(() => {
    gsap.to(boxRef.current, {
      x:300, // Move 300px horizontally
      rotate:360,
      scale:1.5,
      ease:"none",
      scrollTrigger: {
        start: "top 80%",
        end: "+=2000", // how long the animation lasts
        scrub: true, // sync animation with scroll
        pin: true, // pin the section while animating
        markers: true
      }
    })
  },[])
  return (
    <div className="bg-gray-100">
      <div className="min-h-[100vh] flex items-center justify-center text-2xl font-bold">
        Scroll Down 👇
      </div>

      <section
        ref={sectionRef}
        className="h-[100vh] flex items-center justify-center"
      >
        <div
          ref={boxRef}
          className="w-32 h-32 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
        >
          Animate Me
        </div>
      </section>

      <div className="min-h-[100vh] flex items-center justify-center text-2xl">
        🎉 Done scrolling!
      </div>
    </div>
  )
}

export default ScrollScrapPin