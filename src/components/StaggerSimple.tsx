import { useEffect } from "react";
import { gsap } from "gsap";

const GsapStaggerSimple = () => {
  useEffect(() => {
    gsap.from(".stagger-box", {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-4">
        <div className="stagger-box w-20 h-20 bg-red-500 rounded-md"></div>
        <div className="stagger-box w-20 h-20 bg-green-500 rounded-md"></div>
        <div className="stagger-box w-20 h-20 bg-blue-500 rounded-md"></div>
      </div>
    </div>
  );
};

export default GsapStaggerSimple;
