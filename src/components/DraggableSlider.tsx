import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useEffect, useRef } from "react";
gsap.registerPlugin(Draggable);

function DraggableSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];
  useEffect(() => {
    if (!trackRef.current) return;
    Draggable.create(trackRef.current, {
      type: "x",
      bounds: trackRef.current.parentElement,
      inertia: true,
      edgeResistance: 0.85,
      cursor: "grab",
      dragClickables: true,
    });
  }, []);
  return (
    <div className="w-full overflow-hidden py-20 bg-gray-100">
      <div className="relative w-full px-4">
        <div
          ref={trackRef}
          className="flex gap-4 cursor-grab active:cursor-grabbing"
        >
          {slides.map((text, i) => (
            <div
              key={i}
              className="min-w-[250px] h-[200px] bg-indigo-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow"
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DraggableSlider;
