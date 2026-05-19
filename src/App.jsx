import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

import { teachersData } from './teachersData';
import { PageCover, Page, ClosingPage } from './components/BookPages';
import pabImg from './assets/images/PAB.png';

export default function App() {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const bookRef = useRef();

  // --- NEW: CUSTOM VERTICAL SWIPE TRACKING ---
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  const handleTouchStart = (e) => {
    if (!isPortrait) return; // Only apply on rotated mobile view
    setTouchEndY(null); 
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isPortrait) return;
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isPortrait || touchStartY === null || touchEndY === null) return;
    
    // Calculate how far the thumb dragged up or down
    const distance = touchStartY - touchEndY;
    const isUpSwipe = distance > 50;     // Swiped from bottom to top
    const isDownSwipe = distance < -50;  // Swiped from top to bottom

    if (isDownSwipe) {
      // Swiping DOWN physically pulls the right page to the left -> NEXT PAGE
      bookRef.current.pageFlip().flipNext();
    } else if (isUpSwipe) {
      // Swiping UP physically pulls the left page to the right -> PREV PAGE
      bookRef.current.pageFlip().flipPrev();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const landscapeStyles = isPortrait ? {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100dvh',  
    height: '100dvw', 
    transform: 'translate(-50%, -50%) rotate(-90deg)',
    transformOrigin: 'center center',
    overflow: 'hidden'
  } : {
    position: 'relative',
    width: '100dvw',
    height: '100dvh',
    overflow: 'hidden'
  };

  return (
    <div className="bg-[#0A4D22] flex flex-col font-['Space_Grotesk'] selection:bg-[#F5B800] selection:text-[#0F7132]" style={landscapeStyles}>
      
      {/* PAB Logo Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-70 pointer-events-none" 
        style={{
          backgroundImage: `url(${pabImg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 100px',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Marquee */}
      <div className="relative overflow-hidden whitespace-nowrap border-y-4 border-black bg-[#e4ff1a] py-1.5 z-20">
        <div className="inline-block animate-[marquee_20s_linear_infinite] font-black text-sm md:text-base uppercase tracking-[0.2em] text-black">
           POLLING GURU KELAS IX TERBAIK • SMP PAB 5 PATUMBAK • PILIH PILIHAN ANDA • POLLING GURU KELAS IX TERBAIK • SMP PAB 5 PATUMBAK • PILIH PILIHAN ANDA •
        </div>
      </div>

      {/* Main Container - Added Capture events to hijack the touch controls */}
      <main 
        className="relative z-10 grow flex items-center justify-center p-2 w-full h-full overflow-hidden"
        onTouchStartCapture={handleTouchStart}
        onTouchMoveCapture={handleTouchMove}
        onTouchEndCapture={handleTouchEnd}
      >
        <HTMLFlipBook 
          width={isPortrait ? 200 : 320} 
          height={isPortrait ? 260 : 420} 
          size="stretch"
          minWidth={isPortrait ? 150 : 280}
          maxWidth={isPortrait ? 280 : 450} 
          minHeight={isPortrait ? 200 : 400}
          maxHeight={isPortrait ? 300 : 600} 
          
          // THE FIX: Set swipe distance impossibly high on mobile to kill the native horizontal swipe, 
          // allowing our custom vertical swipe to take over completely.
          swipeDistance={isPortrait ? 9999 : 30} 
          
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={false} 
          ref={bookRef}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          className={`${isPortrait ? 'shadow-[6px_6px_0px_rgba(0,0,0,1)]' : 'shadow-[12px_12px_0px_rgba(0,0,0,1)]'} mx-auto`}
        >
          <PageCover />

          {teachersData.map((teacher, index) => (
            <Page 
              key={index} 
              number={index + 1} 
              name={teacher.name} 
              subject={teacher.subject} 
              color={teacher.color} 
              image={teacher.image} 
            />
          ))}

          <ClosingPage />
          <PageCover />
        </HTMLFlipBook>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .stf__parent {
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        body {
          overscroll-behavior-y: contain;
          overflow: hidden;
          background-color: #0A4D22;
        }
      `}} />
    </div>
  );
}