import gsap from "gsap";
import { useRef, useState } from "react";

function GsapInputFocus() {
  const underlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(labelRef.current, {
      y: -24,
      scale: 0.85,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleBlur = () => {
    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    // Only move lable back if input is empty
    if (value.trim() === "") {
      gsap.to(labelRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-80">
        {/* // floating lable */}
        <label
          ref={labelRef}
          htmlFor="name"
          className="absolute left-1 top-2 text-gray-500 text-lg pointer-events-none origin-left"
        >
          Your Name
        </label>
        <input
        ref={inputRef}
          type="text"
          id="name"
          value={value}
          onChange={(el) => setValue(el.target.value)}
          placeholder="Your Name"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full border-b-2 border-gray-300 bg-transparent focus:outline-none text-lg px-1 py-2"
        />
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600 scale-x-0 origin-left"
        ></div>
      </div>
    </div>
  );
}

export default GsapInputFocus;
