import gsap from "gsap";
import { useEffect, useRef } from "react";

function GsapCustomCursor() {
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
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 border-2 border-amber-200 rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Content with hover interaction */}
      <div className="min-h-screen flex items-center justify-center space-x-8 bg-gray-100 text-xl font-bold">
        <button className="hover-target px-4 py-2 bg-indigo-600 text-white rounded">
          Hover Me
        </button>
        <button className="hover-target px-4 py-2 bg-pink-500 text-white rounded">
          Or Me
        </button>
      </div>
    </>
  );
}

export default GsapCustomCursor;
