import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function HorizontalScrollingSection() {
    const containerRef = useRef<HTMLDivElement | null>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const totalPanels = panelsRef.current.length

        gsap.to(panelsRef.current, {
            xPercent: -100 * (totalPanels -1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub:1,
                markers: true,
                end: () => "+=" + containerRef.current!.offsetWidth
            }
        })

    }, containerRef)
    return () => ctx.revert()

  },[])


  const getRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) panelsRef.current[index] = el;
  };
  return (
     <div className="min-h-[100vh] bg-gray-100">
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Scroll to Slide 👉
      </div>

      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div className="flex w-max h-full">
          {["One", "Two", "Three", "Four"].map((text, i) => (
            <div
              key={i}
            //   ref={(el) => el && (panelsRef.current[i] = el)}
            ref={getRef(i)}
              className={`w-screen h-full flex items-center justify-center text-white text-4xl font-bold ${
                i % 2 === 0 ? "bg-indigo-600" : "bg-pink-600"
              }`}
            >
              Panel {text}
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-center text-3xl">
        🎉 Done scrolling horizontally!
      </div>
    </div>
  )
}

export default HorizontalScrollingSection