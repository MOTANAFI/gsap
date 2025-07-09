import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

function GsapSuccessCheckmark() {
  const circleRef = useRef<SVGCircleElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;

    const tl = gsap.timeline();

    tl.fromTo(
      circleRef.current,
      { strokeDasharray: 283, strokeDashoffset: 283 },
      { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }
    ).fromTo(
      checkRef.current,
      { strokeDasharray: 50, strokeDashoffset: 50 },
      { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );
  }, [show]);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-green-600 text-white rounded shadow-md"
      >
        Show Success
      </button>

      {show && (
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
          />
          <path
            ref={checkRef}
            d="M32 50 L45 63 L68 38"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export default GsapSuccessCheckmark;
