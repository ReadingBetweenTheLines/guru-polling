import { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

import { teachersData } from './teachersData';
import { PageCover, Page, ClosingPage } from './components/BookPages';

export default function App() {
  const bookRef = useRef();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A4D22] flex flex-col font-['Space_Grotesk'] selection:bg-[#F5B800] selection:text-[#0F7132] relative" 
     style={{ backgroundImage: 'radial-gradient(#F5B800 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      
      <div className="overflow-hidden whitespace-nowrap border-y-4 border-black bg-[#e4ff1a] py-1.5 z-20">
        <div className="inline-block animate-[marquee_20s_linear_infinite] font-black text-sm md:text-base uppercase tracking-[0.2em] text-black">
           VOTE FOR YOUR FAVORITE • POLLS CLOSE FRIDAY • MAKE YOUR VOICE HEARD • VOTE FOR YOUR FAVORITE • 
        </div>
      </div>

      {/* Simplified padding, centering everything horizontally and vertically */}
      <main className="grow flex items-center justify-center p-4 w-full h-full overflow-hidden">
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