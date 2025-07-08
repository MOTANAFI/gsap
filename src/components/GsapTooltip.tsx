import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function GsapTooltip() {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const moveTooltip = (e: MouseEvent) => {
      gsap.to(tooltip, {
        x: e.clientX + 16,
        y: e.clientY + 16,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    if(isVisible) {
        window.addEventListener("mousemove", moveTooltip);
        gsap.to(tooltip, {autoAlpha:1, scale:1, duration:0.3})
    } else {
        window.removeEventListener("mousemove", moveTooltip);
        gsap.to(tooltip, {autoAlpha:0, scale:0.9, duration:0.2})
    }
    return () => window.removeEventListener("mousemove", moveTooltip)
  }, [isVisible]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="px-6 py-3 bg-indigo-600 text-white rounded relative"
      >
        Hover me
      </button>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed bg-black text-white text-sm px-3 py-2 rounded pointer-events-none opacity-0 scale-90"
        style={{ zIndex: 9999, left:0, top:0 }}
      >
        I’m a tooltip!
      </div>
    </div>
  );
}

export default GsapTooltip;
