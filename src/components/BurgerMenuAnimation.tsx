import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
// ⬅️ Must import this

gsap.registerPlugin(useGSAP); // Register once

function BurgerMenuAnimation() {
  const [isOpen, setIsOpen] = useState(false);
  const topLine = useRef<SVGLineElement>(null);
  const middleLine = useRef<SVGLineElement>(null);
  const bottomLine = useRef<SVGLineElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(topLine.current, {
        y: 10,
        rotate: 45,
        transformOrigin: "center",
        duration: 0.3,
      })
      .to(
        middleLine.current,
        {
          x: -20,
          autoAlpha: 0,
          duration: 0.3,
        },
        "<"
      )
      .to(
        bottomLine.current,
        {
          y: -10,
          rotate: -45,
          transformOrigin: "center",
          duration: 0.3,
        },
        "<"
      );
  }, []);
  const toggleMenu = () => {
    const nextState = !isOpen
    setIsOpen(nextState);
    if (tl.current) {
      isOpen ? tl.current.reverse() : tl.current.play();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button onClick={toggleMenu} className="focus:outline-none">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <line
            ref={topLine}
            x1="10"
            y1="15"
            x2="40"
            y2="15"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            ref={middleLine}
            x1="10"
            y1="25"
            x2="40"
            y2="25"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            ref={bottomLine}
            x1="10"
            y1="35"
            x2="40"
            y2="35"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default BurgerMenuAnimation;
