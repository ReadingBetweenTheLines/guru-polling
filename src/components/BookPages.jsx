import React, { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import garudaImg from '../assets/images/garuda.jpg';
import ragaImg from '../assets/images/olahraga.jpg';
import inggrisImg from '../assets/images/inggris.avif';
import indonesiaImg from '../assets/images/indonesia.jpg';

// --- THE FOOLPROOF THEME ENGINE ---
const getSubjectTheme = (subject) => {
  const lowerSub = subject ? subject.toLowerCase() : "";

  if (lowerSub.match(/(matematika|math|calculus|physics|chemistry|science|ipa)/)) {
    return {
      Background: () => {
        const patternId = `math-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <>
            <div className="absolute inset-0 bg-[#f8fafc] z-0"></div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60" style={{ backgroundImage: 'linear-gradient(#bfdbfe 2px, transparent 2px), linear-gradient(90deg, #bfdbfe 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 text-blue-900">
              <svg width="100%" height="100%">
                <pattern id={patternId} x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                  <text x="15" y="40" fontFamily="serif" fontSize="16" fontStyle="italic" fill="currentColor">E = mc²</text>
                  <text x="80" y="80" fontFamily="serif" fontSize="24" fill="currentColor">∫ f(x) dx</text>
                  <text x="20" y="130" fontFamily="serif" fontSize="20" fill="currentColor">A = πr²</text>
                  <text x="130" y="150" fontFamily="serif" fontSize="20" fill="currentColor">∑</text>
                  <text x="10" y="170" fontFamily="serif" fontSize="16" fill="currentColor">cos(θ)</text>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
              </svg>
            </div>
          </>
        );
      },
      glassClass: 'bg-transparent pt-2 z-10 m-2 mb-2', 
      nameClass: 'text-blue-950 font-serif text-xl font-black tracking-tight', 
      fontClass: 'font-mono font-bold text-blue-800 tracking-tight border-blue-900/30 text-[10px]',
      imageBorder: 'border-[4px] border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,0.15)] z-10 m-2 mt-3 bg-white', 
      buttonClass: 'bg-blue-900 text-white border-2 border-blue-950 hover:bg-blue-700 shadow-[4px_4px_0px_rgba(23,37,84,0.3)] hover:shadow-none transition-all mt-auto',
      icon: '📐' 
    };
  }

  else if (lowerSub.match(/(tik|teknologi|informasi|komunikasi|komputer|computer|it|tech|programming)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#020617] z-0 overflow-hidden"></div>
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-linear-to-b from-fuchsia-500 to-orange-500 rounded-full blur-[2px] opacity-70 translate-y-[-20%] shadow-[0_0_60px_rgba(217,70,239,0.6)]"></div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[50%] z-0 pointer-events-none" style={{ perspective: '800px' }}>
            <div className="absolute w-[200%] h-[200%] left-[-50%] bottom-[-10%]" 
                 style={{
                   backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 2px, transparent 2px)',
                   backgroundSize: '40px 40px',
                   transform: 'rotateX(75deg)', 
                   transformOrigin: 'bottom center',
                   maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
                   WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)' 
                 }}>
            </div>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-0 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#22d3ee] font-mono font-black text-2xl uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(217,70,239,0.8)] leading-none',
      fontClass: 'text-[#f0abfc] font-mono font-bold uppercase text-[9px] tracking-[0.2em] mt-1 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]',
      imageBorder: 'border-[3px] border-[#22d3ee] bg-[#020617] p-1 shadow-[0_0_15px_rgba(217,70,239,0.5)] z-10 m-3 mb-1 transition-all duration-500',
      buttonClass: 'mt-auto mb-2 bg-[#0f172a] text-[#22d3ee] font-mono font-black border-[2px] border-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#0f172a] shadow-[4px_4px_0_rgba(217,70,239,0.9)] active:translate-y-1 hover:shadow-none transition-all py-2 tracking-widest uppercase text-xs',
      icon: '👾' 
    };
  }
  
  else if (lowerSub.match(/(inggris|english|sastra|literature|writing|poetry)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#ebe6d8] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none" style={{ backgroundImage: `url(${inggrisImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
          <div className="absolute inset-0 z-0 opacity-[0.15] font-serif text-[8px] leading-tight p-2 columns-4 md:columns-5 text-justify wrap-break-word overflow-hidden pointer-events-none text-black">
            {Array(40).fill("Language is the road map of a culture. It tells you where its people come from and where they are going. Grammar is the structural foundation of our ability to express ourselves. ").join("")}
          </div>
          <div className="absolute right-4 top-10 opacity-30 border-2 border-red-700 text-red-700 font-black text-sm px-2 py-1 transform rotate-12 pointer-events-none tracking-widest">EDITED</div>
          <div className="absolute left-10 top-20 w-32 h-32 rounded-full border-[3px] border-amber-900 opacity-10 pointer-events-none"></div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-2 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-black font-serif font-black text-xl tracking-tighter w-fit px-1 leading-none bg-[#fef08a] shadow-[-4px_3px_0_rgba(0,0,0,0.8)] -rotate-1',
      fontClass: 'font-mono font-bold text-white bg-black w-fit uppercase text-[9px] tracking-[0.1em] px-2 py-0.5 mt-1 -rotate-1 shadow-[2px_2px_0_rgba(0,0,0,0.3)]',
      imageBorder: 'border-l-[8px] border-r-[2px] border-y-[6px] border-white bg-white p-0 shadow-[6px_10px_10px_rgba(0,0,0,0.4)] z-10 m-3 mb-1 -rotate-3 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-black text-[#ebe6d8] font-mono font-black border-b-[4px] border-b-gray-800 hover:border-b-0 hover:translate-y-[4px] active:scale-95 transition-all py-2 tracking-widest uppercase shadow-[0_6px_10px_rgba(0,0,0,0.5)] hover:shadow-none text-xs',
      icon: '📰'
    };
  }
  
  else if (lowerSub.match(/(seni|budaya|art|music|design|karya)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#7f1d1d] z-0"></div>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%">
              <pattern id="batik-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="12" fill="none" stroke="#fcd34d" strokeWidth="1" />
                <circle cx="30" cy="30" r="3" fill="#fcd34d" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#batik-pattern)" />
            </svg>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-1 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#fcd34d] font-serif font-black text-xl tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
      fontClass: 'font-sans font-bold uppercase text-[9px] tracking-[0.2em] text-amber-200/90 border-none mt-0',
      imageBorder: 'border-[4px] border-[#451a03] bg-[#fef3c7] p-1 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 m-3 mb-1',
      buttonClass: 'mt-auto mb-2 bg-transparent text-[#fcd34d] font-serif font-bold border-[2px] border-[#fcd34d] hover:bg-[#fcd34d] hover:text-[#7f1d1d] transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🎭'
    };
  }

  else if (lowerSub.match(/(jasmani|olahraga|kesehatan|physical|health|gym|sports)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#b91c1c] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url(${ragaImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
          <div className="absolute -left-6 top-4 opacity-[0.25] font-mono font-black text-[60px] italic text-white pointer-events-none leading-none -rotate-6">145 BPM</div>
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <svg width="100%" height="100%">
              <path d="M -50 400 Q 150 500 400 100" fill="none" stroke="white" strokeWidth="4" />
              <path d="M 0 600 L 100 600 L 130 500 L 160 650 L 190 550 L 220 600 L 400 600" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"/>
            </svg>
          </div>
          <div className="absolute top-4 right-4 opacity-80 pointer-events-none z-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 bg-[#b91c1c] relative" style={{ clipPath: 'polygon(33% 0, 66% 0, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0 66%, 0 33%, 33% 33%)' }}></div>
            </div>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-2 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-white font-sans font-black text-xl uppercase italic tracking-tighter drop-shadow-[2px_2px_0_#7f1d1d] transform -skew-x-6 w-fit leading-none',
      fontClass: 'bg-[#fde047] text-black font-sans font-black uppercase text-[9px] tracking-[0.15em] px-2 py-0.5 shadow-[2px_2px_0_#7f1d1d] w-fit mt-1 transform -skew-x-6',
      imageBorder: 'border-[5px] border-white bg-[#4ade80] p-1 shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-10 m-3 mb-1 rotate-2 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-white text-[#b91c1c] font-black italic border-[3px] border-white hover:bg-transparent hover:text-white hover:border-white shadow-[0_5px_0_#7f1d1d] active:translate-y-[4px] active:shadow-none transition-all py-2 tracking-widest uppercase transform -skew-x-6 text-xs',
      icon: '👟' 
    };
  }

  else if (lowerSub.match(/(alam|ipa|science|biologi|fisika|kimia)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#020617] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-10 font-mono text-[6px] leading-tight p-2 columns-4 overflow-hidden pointer-events-none text-[#22d3ee]">
             {Array(15).fill("H2O CO2 NaCl CH4 F=ma E=mc^2 V=IR DNA ").join("")}
          </div>
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="hexagons" width="40" height="69.28" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <path d="M 40 17.32 L 20 5.77 L 0 17.32 L 0 40.41 L 20 51.96 L 40 40.41 Z" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#4ade80] opacity-30 blur-[80px] rounded-full pointer-events-none"></div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-1 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#22d3ee] font-sans font-black text-2xl uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] leading-none',
      fontClass: 'font-mono font-bold text-[#4ade80] uppercase text-[9px] tracking-[0.2em] mt-1 -rotate-1',
      imageBorder: 'border-[4px] border-[#22d3ee] bg-[#082f49] p-1 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 m-3 mb-1 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-black text-[#22d3ee] font-mono font-black border-[2px] border-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#020617] hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🧬' 
    };
  }

  else if (lowerSub.match(/(sosial|ips|sejarah|geografi|ekonomi|sosiologi)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#291204] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%">
              <path d="M -50 100 Q 150 50 300 200 T 500 100" fill="none" stroke="#fbbf24" strokeWidth="1" />
              <path d="M -50 300 Q 200 400 350 250 T 600 400" fill="none" stroke="#fbbf24" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-12 right-6 w-16 h-16 rounded-full border-2 border-dashed border-[#dc2626] opacity-50 flex items-center justify-center rotate-12 pointer-events-none">
             <span className="text-[#dc2626] font-black text-[8px] text-center uppercase">Approved</span>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-2 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#fbbf24] font-serif font-black text-xl uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,1)] leading-none',
      fontClass: 'bg-[#451a03] text-[#fbbf24] font-serif font-bold uppercase text-[9px] tracking-[0.15em] px-2 py-0.5 w-fit mt-1 border border-[#fbbf24] shadow-[2px_2px_0_rgba(0,0,0,1)]',
      imageBorder: 'border-[4px] border-black bg-[#fbbf24] p-1 shadow-[8px_8px_0_rgba(0,0,0,0.6)] z-10 m-3 mb-1 -rotate-1 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-black text-[#fbbf24] font-serif font-bold border-[2px] border-[#fbbf24] hover:bg-[#fbbf24] hover:text-black active:translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-none transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🏛️' 
    };
  }
  
  else if (lowerSub.match(/(agama|islam|pai|budi|pekerti)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#064e3b] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="islamic-star" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="none" stroke="#fbbf24" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#islamic-star)" />
            </svg>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-1 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#fde68a] font-serif font-black text-xl tracking-tight drop-shadow-[0_2px_2px_rgba(2,44,34,1)] leading-none',
      fontClass: 'text-[#34d399] font-sans font-bold uppercase text-[9px] tracking-[0.2em] mt-1 drop-shadow-md',
      imageBorder: 'border-x-[4px] border-b-[4px] border-t-[8px] border-[#fbbf24] bg-[#022c22] p-1 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 m-3 mb-1',
      buttonClass: 'mt-auto mb-2 bg-[#022c22] text-[#fde68a] font-serif font-bold border-[2px] border-[#fbbf24] hover:bg-[#fbbf24] hover:text-[#064e3b] shadow-[0_6px_12px_rgba(0,0,0,0.4)] transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🕌' 
    };
  }

  else if (lowerSub.match(/(kewarganegaraan|pkn|pancasila|civic|ppkn)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#7f1d1d] z-0"></div>
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 bg-[#fde68a] opacity-30 blur-[40px] rounded-full"></div>
          </div>
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{ backgroundImage: `url(${garudaImg})`, backgroundPosition: 'center', backgroundSize: '140%', backgroundRepeat: 'no-repeat' }}></div>
          <div className="absolute inset-0 z-0 opacity-[0.06] font-serif text-[6px] leading-tight p-2 columns-3 overflow-hidden pointer-events-none text-white text-justify">
             {Array(15).fill("Bahwa sesungguhnya Kemerdekaan itu ialah hak segala bangsa dan oleh sebab itu, maka penjajahan di atas dunia harus dihapuskan. ").join("")}
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-2 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-white font-sans font-black text-xl uppercase italic tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] leading-none',
      fontClass: 'bg-white text-[#991b1b] font-black uppercase text-[9px] tracking-[0.2em] px-2 py-0.5 mt-1 w-fit shadow-[2px_2px_0_rgba(0,0,0,0.8)] -rotate-1',
      imageBorder: 'border-[5px] border-white bg-black p-1 shadow-[6px_6px_0_rgba(0,0,0,0.5)] z-10 m-3 mb-1 rotate-2 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-white text-[#991b1b] font-black italic border-[3px] border-black hover:bg-black hover:text-white hover:border-black active:translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-none transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🦅' 
    };
  }

  else if (lowerSub.match(/(muatan|lokal|mulok|budaya|daerah)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#78350f] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="weave" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 30 15 L 15 30 L 0 15 Z" fill="none" stroke="#fcd34d" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#weave)" />
            </svg>
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-3 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#fcd34d] font-serif font-black text-xl uppercase tracking-wider drop-shadow-[2px_2px_0_rgba(69,26,3,1)] leading-none',
      fontClass: 'text-[#fef3c7] font-sans font-bold uppercase text-[9px] tracking-[0.2em] mt-1 bg-[#451a03] w-fit px-2 py-0.5 rounded-sm shadow-[2px_2px_0_rgba(0,0,0,0.5)]',
      imageBorder: 'border-[4px] border-[#451a03] bg-[#b45309] p-1 shadow-[0_10px_15px_rgba(0,0,0,0.6)] z-10 m-3 mb-1 rounded-sm rotate-1 transition-transform duration-500',
      buttonClass: 'mt-auto mb-2 bg-[#451a03] text-[#fcd34d] font-serif font-bold border-[2px] border-[#fcd34d] hover:bg-[#fcd34d] hover:text-[#451a03] shadow-[3px_3px_0_rgba(0,0,0,0.8)] active:translate-y-1 hover:shadow-none transition-all py-2 tracking-widest uppercase text-xs',
      icon: '🌿' 
    };
  }

  else if (lowerSub.match(/(bimbingan|konseling|bk|counseling|psikologi)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#1e1b4b] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-10 font-serif text-[8px] leading-relaxed p-3 columns-2 overflow-hidden pointer-events-none text-[#e0e7ff] text-justify italic">
             {Array(15).fill("How do you feel today? What are your dreams? Every step is progress. ").join("")}
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-1 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-[#fbcfe8] font-serif font-black text-xl tracking-tight drop-shadow-[0_0_8px_rgba(244,114,182,0.5)] leading-none',
      fontClass: 'bg-[#fbcfe8] text-[#1e1b4b] font-sans font-bold uppercase text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-full w-fit mt-1 shadow-[0_2px_5px_rgba(0,0,0,0.4)]',
      imageBorder: 'border-[4px] border-[#fbcfe8] bg-[#312e81] p-1 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 m-3 mb-1 rounded-[1rem] transition-all duration-500',
      buttonClass: 'mt-auto mb-1 bg-transparent text-[#fbcfe8] font-sans font-bold border-[2px] border-[#fbcfe8] hover:bg-[#fbcfe8] hover:text-[#1e1b4b] active:scale-95 transition-all py-2 tracking-widest uppercase rounded-full text-xs',
      icon: '🧠' 
    };
  }

  else if (lowerSub.match(/(indonesia|indo)/)) {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#fafaf9] z-0"></div>
          <div className="absolute inset-0 z-0 opacity-85 pointer-events-none " style={{ backgroundImage: `url(${indonesiaImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
          <div className="absolute inset-0 z-0 opacity-[0.08] font-serif text-[8px] leading-relaxed p-2 columns-3 overflow-hidden pointer-events-none text-black text-justify">
             {Array(15).fill("Kami putra dan putri Indonesia, menjunjung bahasa persatuan. Membaca adalah melawan. ").join("")}
          </div>
        </>
      ),
      glassClass: 'bg-transparent border-none shadow-none z-10 m-3 -mt-2 pt-0 flex flex-col grow gap-1',
      nameClass: 'text-black font-serif font-black text-xl tracking-tighter drop-shadow-[2px_2px_0_#fff,3px_3px_0_rgba(0,0,0,0.1)] leading-none mt-1',
      fontClass: 'text-[#dc2626] font-mono font-bold uppercase text-[9px] tracking-[0.2em] mt-1 drop-shadow-[1px_1px_0_#fff]',
      imageBorder: 'border-x-[4px] border-t-[4px] border-b-[16px] border-white bg-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] z-10 m-3 mb-0 rotate-2 transition-transform duration-500 sepia-[0.3]',
      buttonClass: 'mt-auto mb-2 bg-black text-[#fafaf9] font-serif font-bold border-2 border-black hover:bg-transparent hover:text-black active:translate-y-1 shadow-[3px_3px_0_#dc2626] hover:shadow-none transition-all py-2 tracking-widest uppercase text-xs',
      icon: '✒️' 
    };
  }

  else {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#FEFCF5] z-0"></div>
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #cbd5e1 95%)', backgroundSize: '100% 24px' }}></div>
        </>
      ),
      glassClass: 'bg-[#FEFCF5]/90 border-t-2 border-black pt-2 m-2 z-10',
      nameClass: 'text-black text-xl',
      fontClass: 'font-serif font-bold text-[10px] text-emerald-800 border-black',
      imageBorder: 'border-b-4 border-black z-10 m-2 mt-3',
      buttonClass: 'mt-auto mb-2 bg-black text-white border-2 border-black hover:bg-emerald-600 shadow-[3px_3px_0px_rgba(0,0,0,1)] text-xs py-2',
      icon: '📚'
    };
  }
};

export const PageCover = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div className="w-full h-full border-4 border-black overflow-hidden flex flex-col justify-center items-center">
        <div className="p-3 w-full h-full border-[6px] border-white bg-black text-white flex flex-col justify-center items-center text-center">
          <p className="font-bold text-pink-500 uppercase tracking-widest mb-2 border-2 border-pink-500 px-2 py-1 rounded-full animate-pulse text-[8px]">
            Tahun Ajaran 2025/2026
          </p>
          <h1 className="text-2xl font-black tracking-tighter uppercase leading-tight mb-2">
            Guru-guru Terbaik<br />SMP PAB 5
          </h1>
          <p className="text-[10px] font-bold text-cyan-400">Geser untuk buka</p>
        </div>
      </div>
    </div>
  );
});

export const ClosingPage = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div className="w-full h-full border-y-4 border-black border-r-4 border-l-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-center items-center p-4 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 text-black">Terima kasih!</h2>
        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Your vote makes a difference.</p>
      </div>
    </div>
  );
});

export const Page = React.forwardRef((props, ref) => {
  const theme = getSubjectTheme(props.subject);
  const ThemeBackground = theme.Background; 

  const [isVoting, setIsVoting] =useState(false);

  const handleVote = async () => {
    setIsVoting(true);
    try {
      let user = auth.currentUser;
      if (!user) {
        const result = await signInWithPopup(auth, googleProvider);
        user = result.user;
      }
      const userVoteRef = doc(db, "voters", user.email);
      const userVoteDoc = await getDoc(userVoteRef);

      if (userVoteDoc.exists()) {
        alert("Maaf, Anda sudah memberikan suara sebelumnya!");
        setIsVoting(false);
        return;
      }
      await setDoc(userVoteRef, {
        votedFor: props.name,
        subject: props.subject,
        voterName: user.displayName,
        votedAt: new Date()
      });
      alert(`Terima kasih! Suara Anda untuk ${props.name} telah direkam.`);
    } catch (error) {
      console.error("Error:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Terjadi kesalahan. Pastikan koneksi internet Anda lancar.");
      }
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div 
        className={`w-full h-full border-y-4 border-black border-r-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col relative ${props.number % 2 === 0 ? 'border-l-4' : 'border-l-0'}`} 
      >
        <ThemeBackground />
        <div className="grow flex flex-col h-full bg-transparent relative z-10 group">
          {/* Changed height from 60% to 50% to prevent squeezing the text box below */}
          <div className={`relative h-[50%] p-1 ${theme.imageBorder}`} style={{ backgroundColor: props.color }}>
             <img 
                src={props.image} 
                alt={props.name} 
                className="w-full h-full object-cover border-2 border-black transition-all duration-500" 
              />
          </div>
          
          <div className={`p-2 flex flex-col gap-2 grow ${theme.glassClass}`}>
            <div>
              <h2 className={`font-black uppercase tracking-tighter leading-none ${theme.nameClass}`}>
                {props.name}
              </h2>
              <p className={`border-t-2 pt-1 flex items-center gap-1 ${theme.fontClass}`}>
                <span>{theme.icon}</span> {props.subject}
              </p>
            </div>
            
            <button 
              disabled={isVoting}
              onClick={handleVote}
              className={`w-full font-black uppercase tracking-widest transition-all cursor-pointer z-50  
                ${theme.buttonClass} 
                ${isVoting ? 'opacity-70 cursor-not-allowed scale-95' : 'active:translate-y-1 active:translate-x-1'}
              `}
            >
              {isVoting ? (
                <span className="flex items-center justify-center gap-1 text-[10px]">
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full"></span>
                  VOTING...
                </span>
              ) : "Cast Vote"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});