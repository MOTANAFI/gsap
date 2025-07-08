import gsap from "gsap"
import { useEffect, useRef, useState } from "react"


function GsapModal() {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)

    const tl = useRef<gsap.core.Timeline>(null)

    useEffect(() => {
        if(!modalRef.current || !overlayRef.current) return 
        //create timeline (paused by default)

        tl.current= gsap.timeline({paused: true})

        tl.current.set(modalRef.current, {display: "block"})
        .fromTo(overlayRef.current, 
            {autoAlpha:0},
            {autoAlpha:1, duration: 0.3}
        )
        .fromTo(modalRef.current, 
            {scale:0.8, autoAlpha:0},
            {scale:1, autoAlpha:1, duration:0.4, ease: "power2.out"}, "-=0.2"
        )

    },[])

    const openModal = () => {
        setIsOpen(true)
        tl.current?.play()
    }
    const closeModal = () => {
        tl.current?.reverse().then(() => setIsOpen(false))
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <button
        onClick={openModal}
        className="px-6 py-3 bg-indigo-600 text-white rounded shadow-md" 
        >
            Open modal
        </button>
       
            <>
              {/* Overlay */}
              <div ref={overlayRef} className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40"
              style={{pointerEvents: isOpen ? "auto": "none"}}
              onClick={closeModal}
              ></div>
              {/* Modal */}
              <div ref={modalRef} className="fixed z-50 top-1/2 left-1/2 bg-white p-8 rounded shadow-lg w-[90%] max-w-md text-center"
              style={{transform: "translate(-50%, -50%)", pointerEvents: isOpen ? "auto": "none"}}
              >
                  <h2 className="text-2xl font-bold mb-4">GSAP Modal</h2>
            <p className="mb-6">This modal fades and scales in!</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
              </div>
            </>
        
    </div>
  )
}

export default GsapModal