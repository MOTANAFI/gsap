import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
function ScrollSyncedHero() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement | null >(null)
    const subtitleRef = useRef<HTMLParagraphElement | null >(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: true,
                    markers: true
                }
            })
            tl.fromTo(
                titleRef.current, 
                {y:100, opacity:0},
                {y:0, opacity:1, duration:1}
            ).fromTo(
                subtitleRef.current, 
                {y:100, opacity:0},
                {y:0, opacity:1, duration:1},
                "+-=0.5"
            ).fromTo(
                imageRef.current, 
                {scale: 1.2, opacity:0},
                {scale:1, opacity:1, duration:1},
                "-=0.5"

            )

        },sectionRef)
        return () => ctx.revert()

    },[])
  return (
    <div ref={sectionRef} className="h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 overflow-hidden px-4">
      <h1 ref={titleRef} className="text-5xl font-bold">
        Scroll Synced Hero
      </h1>
      <p ref={subtitleRef} className="text-xl">
        This subtitle fades in too.
      </p>
      <img
        ref={imageRef}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s"
        alt="Nature"
        className="rounded-lg max-w-full max-h-[300px] object-cover"
      />
    </div>
  )
}

export default ScrollSyncedHero