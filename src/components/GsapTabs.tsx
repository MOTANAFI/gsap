import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

const tabs = [
  {
    title: "Overview",
    content: "GSAP is a powerful animation library for modern UIs.",
  },
  {
    title: "Features",
    content: "It supports timelines, scroll, hover, SVG, canvas, and more.",
  },
  {
    title: "Use Cases",
    content: "Landing pages, dashboards, games, modals, and beyond.",
  },
];

function GsapTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const switchTab = (index: number) => {
    if (index === activeTab || !contentRef.current) return;

    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(index);

        // Animate in after content update
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, delay: 0.1 }
        );
      },
    });
  };
   useEffect(() => {
    gsap.set(contentRef.current, { opacity: 1, y: 0 }); // Set initial state
  }, []);
  return (
     <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => switchTab(i)}
            className={`px-4 py-2 rounded ${
              activeTab === i ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div ref={contentRef} className="text-gray-700 text-lg min-h-[100px]">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default GsapTabs;
