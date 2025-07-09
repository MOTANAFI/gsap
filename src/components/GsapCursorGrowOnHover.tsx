import gsap from "gsap";
import { useEffect, useRef } from "react";

function GsapCursorGrowOnHover() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // move the cursor
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    // Hover targets
    const hoverTargets = document.querySelectorAll(".hover-target");

    const growCursor = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: "#6366f1",
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#4f46e5",
        duration: 0.3,
        ease: "power2.out",
      });
    };
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", growCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });
    window.addEventListener("mousemove", moveCursor)
    return () => {
        window.removeEventListener("mousemove", moveCursor);
        hoverTargets.forEach(el => {
            el.removeEventListener("mouseenter", growCursor)
            el.removeEventListener("mouseleave", shrinkCursor)
        })
    }
  }, []);
  return (
    <div className="min-h-screen bg-white relative">
      <div className="text-center pt-40 text-3xl font-bold">
        Hover over buttons
      </div>
      <div className="flex justify-center mt-16 gap-6">
        <button className="hover-target px-6 py-3 bg-indigo-600 text-white rounded text-lg">
          Button 1
        </button>
        <button className="hover-target px-6 py-3 bg-indigo-600 text-white rounded text-lg">
          Button 2
        </button>
      </div>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-indigo-700 rounded-full pointer-events-none z-50"
        style={{ left: 0, top: 0 }}
      ></div>
    </div>
  );
}

export default GsapCursorGrowOnHover;
