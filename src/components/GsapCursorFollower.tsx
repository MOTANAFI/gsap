import gsap from "gsap";
import { useEffect, useRef } from "react";

function GsapCursorFollower() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="text-center pt-40 text-3xl font-bold">
        Move your cursor around!
      </div>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-indigo-600 rounded-full pointer-events-none z-50"
        style={{ left: 0, top: 0 }}
      ></div>
    </div>
  );
}

export default GsapCursorFollower;
