import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

import { teachersData } from './teachersData';
import { PageCover, Page, ClosingPage } from './components/BookPages';
import pabImg from './assets/images/PAB.png';

export default function App() {
  // 1. Detect if the screen is taller than it is wide (portrait mode)
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const bookRef = useRef();

  // 2. Listen for phone rotation or resizing
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    // Run once on load
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. THE HACK: If portrait, swap width/height and rotate -90deg. If not, act normal.
  const landscapeStyles = isPortrait ? {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100dvh',  // Width takes the height of the phone
    height: '100dvw', // Height takes the width of the phone
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
    // 4. Replaced "h-screen w-screen relative" with our dynamic landscapeStyles
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

      {/* Main Container */}
      <main className="relative z-10 grow flex items-center justify-center p-2 w-full h-full overflow-hidden">
        <HTMLFlipBook 
          // THE FIX: We use isPortrait to shrink the dimensions drastically for mobile phones
          width={isPortrait ? 200 : 320} 
          height={isPortrait ? 260 : 420} 
          
          size="stretch"
          minWidth={isPortrait ? 150 : 280}
          maxWidth={isPortrait ? 280 : 450} 
          minHeight={isPortrait ? 200 : 400}
          maxHeight={isPortrait ? 300 : 600} 
          
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          
          usePortrait={false} 
          ref={bookRef}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          // Slightly smaller shadow on mobile so it doesn't add to the width
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

      {/* 5. Added global styles to prevent scrolling bugs when the screen is rotated */}
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