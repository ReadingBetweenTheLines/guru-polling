import { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

import { teachersData } from './teachersData';
import { PageCover, Page, ClosingPage } from './components/BookPages';
import pabImg from './assets/images/PAB.png';

export default function App() {
  const bookRef = useRef();

  return (
    // 1. Original wrapper, removed the dotted inline style
    <div className="h-screen w-screen overflow-hidden bg-[#0A4D22] flex flex-col font-['Space_Grotesk'] selection:bg-[#F5B800] selection:text-[#0F7132] relative">
      
      {/* 2. NEW LOGO BACKGROUND LAYER */}
      {/* absolute positioning ensures it does not interfere with the flexbox layout */}
      <div 
        className="absolute inset-0 z-0 opacity-70 pointer-events-none" 
        style={{
          backgroundImage: `url(${pabImg})`, /* Ensure your file is named exactly this in the public folder */
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 100px',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* 3. Original Marquee - Added 'relative' so z-20 works over the background */}
      <div className="relative overflow-hidden whitespace-nowrap border-y-4 border-black bg-[#e4ff1a] py-1.5 z-20">
        <div className="inline-block animate-[marquee_20s_linear_infinite] font-black text-sm md:text-base uppercase tracking-[0.2em] text-black">
           POLLING GURU KELAS IX TERBAIK • SMP PAB 5 PATUMBAK • PILIH PILIHAN ANDA • POLLING GURU KELAS IX TERBAIK • SMP PAB 5 PATUMBAK • PILIH PILIHAN ANDA •
        </div>
      </div>

      {/* 4. Original Main Container - Added 'relative z-10' so the book sits above the logos */}
      <main className="relative z-10 grow flex items-center justify-center p-4 w-full h-full overflow-hidden">
        <HTMLFlipBook 
          width={280} 
          height={380} 
          size="stretch"
          minWidth={250}
          maxWidth={400}     
          minHeight={300}
          maxHeight={500}    /* Aggressively capped at 500px to guarantee top/bottom margins */
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          ref={bookRef}
          className="shadow-[12px_12px_0px_rgba(0,0,0,1)] mx-auto"
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
      `}} />
    </div>
  );
}