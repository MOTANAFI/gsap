import gsap from "gsap";
import { useRef } from "react";

function GsapCardHover() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="w-80 bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Card"
          className="w-full h-48 object-cover transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Card Title</h3>
          <p className="text-gray-600">Hover to see the animation.</p>
        </div>
      </div>
    </div>
  );
}

export default GsapCardHover;
