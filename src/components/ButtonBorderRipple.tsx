import gsap from "gsap";
import { useRef } from "react"

 // Sound file URL 
 const clickSoundUrl = "https://freesound.org/data/previews/256/256113_3263906-lq.mp3";


function ButtonBorderRipple() {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const ringRef = useRef<HTMLSpanElement| null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const trigglerRipple = () => {

        gsap.fromTo(
            ringRef.current,
             {scale:0, opacity:0.5},
              {scale: 2,
                opacity:0,
                duration: 0.6,
                ease: "power2.out"
              }
        )
    }
    const handleEnter = () => {
        trigglerRipple()
    }
    const hanldeClick = () => {
        trigglerRipple()
        // play click sound 
        if(audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play()
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <button
        ref={buttonRef}
        onMouseEnter={handleEnter} 
        onClick={hanldeClick}
        className="relative px-6 py-3 text-white font-semibold rounded overflow-hidden bg-indigo-600"
        >
            Hover Me
             {/* Ripple Border  */}
             <span
             ref={ringRef}
             className="absolute inset-0 rounded border-2 border-white pointer-events-none"
             style={{transformOrigin: "enter"}}
             ></span>

        </button>
        {/* Hidden audio element */}
        <audio ref={audioRef}  src={clickSoundUrl} preload="auto" />
    </div>
  )
}

export default ButtonBorderRipple