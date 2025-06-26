import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function GsapChallenge() {
  const [visible, setVisible] = useState(false);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleBoxes = () => {
    setVisible(!visible);
  };

  const setBoxRef = (el: HTMLDivElement | null, index: number) => {
    if (el) boxRefs.current[index] = el;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // const currentBox = boxRefs.current;
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotate: 15,
      skewX: 15,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };
  const handleMouseLeave = (e:React.MouseEvent<HTMLDivElement>) => {
    // const currentBox = boxRefs.current;
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      skewX: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    const currentBox = boxRefs.current;
    if (currentBox) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1 },
      });
      tl.from(currentBox, { x: -200, opacity: 0 })
        .to(currentBox, { rotate: 360, repeat: 1, yoyo: true })
        .to(currentBox, { scale: 1.5 })
        .to(currentBox, { x: 0, scale: 1, stagger: 0.3, rotate: "360_short" });
    }
  }, [visible]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={toggleBoxes}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform"
        >
          {visible ? "Hide" : "Show"} Box
        </button>
        {visible && (
          <div className="flex gap-6 ">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={(el) => setBoxRef(el, i)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-24 h-24 bg-indigo-500 rounded-lg shadow-lg"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GsapChallenge;
