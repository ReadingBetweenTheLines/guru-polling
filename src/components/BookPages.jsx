import React from 'react';
import { auth, googleProvider, db } from '../firebase'; // Path to your firebase.js
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- THE FOOLPROOF THEME ENGINE ---
const getSubjectTheme = (subject) => {
  const lowerSub = subject ? subject.toLowerCase() : "";

  // 1. MATEMATIKA & STEM -> The "Scribbled Math Notebook" Theme
  if (lowerSub.match(/(matematika|math|calculus|physics|chemistry|science|ipa)/)) {
    return {
      Background: () => {
        // THE FIX: Generate a unique ID so multiple math pages don't conflict
        const patternId = `math-${Math.random().toString(36).substr(2, 9)}`;

        return (
          <>
            {/* Base paper color */}
            <div className="absolute inset-0 bg-[#f8fafc] z-0"></div>
            
            {/* Blue Grid Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60" style={{ backgroundImage: 'linear-gradient(#bfdbfe 2px, transparent 2px), linear-gradient(90deg, #bfdbfe 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Math Formulas using React SVG */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 text-blue-900">
              <svg width="100%" height="100%">
                <pattern id={patternId} x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                  <text x="15" y="40" fontFamily="serif" fontSize="16" fontStyle="italic" fill="currentColor">E = mc²</text>
                  <text x="80" y="80" fontFamily="serif" fontSize="24" fill="currentColor">∫ f(x) dx</text>
                  <text x="20" y="130" fontFamily="serif" fontSize="20" fill="currentColor">A = πr²</text>
                  <text x="130" y="150" fontFamily="serif" fontSize="20" fill="currentColor">∑</text>
                  <text x="10" y="170" fontFamily="serif" fontSize="16" fill="currentColor">cos(θ)</text>
                </pattern>
                {/* Apply the unique ID to the fill URL */}
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
              </svg>
            </div>
          </>
        );
      },
      glassClass: 'bg-transparent pt-4 z-10 m-3 mb-4', 
      nameClass: 'text-blue-950 font-serif text-3xl font-black tracking-tight', 
      fontClass: 'font-mono font-bold text-blue-800 tracking-tight border-blue-900/30',
      imageBorder: 'border-[4px] border-blue-950 shadow-[4px_4px_0px_rgba(23,37,84,0.15)] z-10 m-3 mt-4 bg-white', 
      buttonClass: 'bg-blue-900 text-white border-2 border-blue-950 hover:bg-blue-700 shadow-[4px_4px_0px_rgba(23,37,84,0.3)] hover:shadow-none transition-all mt-2',
      icon: '📐' 
    };
  }

  // 2. TEKNOLOGI & KOMPUTER (TIK) -> "Tron Legacy / 3D Retro Arcade" (Box-less)
  else if (lowerSub.match(/(tik|teknologi|informasi|komunikasi|komputer|computer|it|tech|programming)/)) {
    // Generate unique ID for the SVG pattern to prevent rendering bugs across pages

    return {
      Background: () => (
        <>
          {/* Deep Cyber Void */}
          <div className="absolute inset-0 bg-[#020617] z-0 overflow-hidden"></div>
          
          {/* Retro Arcade Digital Sun */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-linear-to-b from-fuchsia-500 to-orange-500 rounded-full blur-[2px] opacity-70 translate-y-[-20%] shadow-[0_0_60px_rgba(217,70,239,0.6)]"></div>
          </div>

          {/* 3D Perspective "Tron" Grid Floor */}
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
      // Completely transparent container, lifted up (-mt-16)
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-6 pt-0 flex flex-col grow gap-1',
      
      // Glitch Effect Typography (Cyan with Magenta shadow)
      nameClass: 'text-[#22d3ee] font-mono font-black text-4xl uppercase tracking-tighter drop-shadow-[3px_3px_0_rgba(217,70,239,0.8)] leading-none',
      
      // THE FIX: Removed the background, border, and hard shadow. 
      // Replaced with floating text and a neon pink glow.
      fontClass: 'text-[#f0abfc] font-mono font-bold uppercase text-[10px] tracking-[0.3em] mt-1 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]',
      
      // Levitating Hover Animation for the image
      imageBorder: 'border-[4px] border-[#22d3ee] bg-[#020617] p-1 shadow-[0_0_20px_rgba(217,70,239,0.5)] z-10 m-6 mb-2 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(34,211,238,0.6)] hover:border-[#d946ef]',
      
      // Hardware Button
      buttonClass: 'mt-auto mb-6 bg-[#0f172a] text-[#22d3ee] font-mono font-black border-[3px] border-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#0f172a] shadow-[6px_6px_0_rgba(217,70,239,0.9)] active:translate-y-1 hover:shadow-none transition-all py-3 tracking-widest uppercase',
      icon: '👾' 
    };
  }
  
  // 3. BAHASA INGGRIS & LITERATURE -> "The Editor's Collage" (High Density)
  else if (lowerSub.match(/(inggris|english|bahasa|sastra|literature|writing|poetry)/)) {
    return {
      Background: () => (
        <>
          {/* Gritty Newspaper/Old Book Paper Base */}
          <div className="absolute inset-0 bg-[#ebe6d8] z-0"></div>
          
          {/* LAYER 1: Dense, crowded background text columns */}
          <div className="absolute inset-0 z-0 opacity-[0.15] font-serif text-[8px] leading-tight p-2 columns-4 md:columns-5 text-justify wrap-break-word overflow-hidden pointer-events-none text-black">
            {Array(40).fill("Language is the road map of a culture. It tells you where its people come from and where they are going. Grammar is the structural foundation of our ability to express ourselves. ").join("")}
          </div>

          {/* LAYER 2: Giant overlapping faded cursive/serif words */}
          <div className="absolute -right-20 top-1/4 opacity-[0.06] font-serif italic text-[150px] transform -rotate-12 pointer-events-none text-black leading-none">
             Poetry
          </div>
          <div className="absolute -left-10 bottom-1/4 opacity-[0.06] font-serif font-black text-[180px] transform rotate-6 pointer-events-none text-black leading-none">
             A
          </div>

          {/* LAYER 3: Vintage Library/Editorial Stamps */}
          <div className="absolute right-4 top-10 opacity-30 border-4 border-red-700 text-red-700 font-black text-xl px-2 py-1 transform rotate-12 pointer-events-none tracking-widest">
             EDITED
          </div>
          {/* Fake coffee ring or ink stain */}
          <div className="absolute left-10 top-20 w-32 h-32 rounded-full border-[3px] border-amber-900 opacity-10 pointer-events-none"></div>
        </>
      ),
      // THE CONTAINER: Lifted high, zero background so the collage bleeds through
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-6 pt-0 flex flex-col grow gap-2',
      
      // UNIQUE TEXT: "Yellow Highlighter" effect to make the name survive the crowded background
      nameClass: 'text-black font-serif font-black text-4xl tracking-tighter w-fit px-2 leading-none bg-[#fef08a] shadow-[-6px_4px_0_rgba(0,0,0,0.8)] -rotate-1',
      
      // UNIQUE SUB-TEXT: Black marker box with white text
      fontClass: 'font-mono font-bold text-white bg-black w-fit uppercase text-[10px] tracking-[0.2em] px-2 py-1 mt-1 -rotate-1 shadow-[4px_4px_0_rgba(0,0,0,0.3)]',
      
      // UNIQUE IMAGE: Thrown on the desk like a rough polaroid or clipping
      imageBorder: 'border-l-[12px] border-r-[4px] border-y-[8px] border-white bg-white p-0 shadow-[10px_20px_20px_rgba(0,0,0,0.4)] z-10 m-6 mb-2 -rotate-3 hover:rotate-1 transition-transform duration-500',
      
      // UNIQUE BUTTON: "Typewriter Key" look—heavy, mechanical, bold
      buttonClass: 'mt-auto mb-6 bg-black text-[#ebe6d8] font-mono font-black border-b-[6px] border-b-gray-800 hover:border-b-0 hover:translate-y-[6px] active:scale-95 transition-all py-3 tracking-widest uppercase shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-none',
      icon: '📰' // Newspaper icon
    };
  }
  
  // 4. SENI BUDAYA (Arts & Culture) -> "Cultural Heritage (Floating & Lifted)"
  else if (lowerSub.match(/(seni|budaya|art|music|design|karya)/)) {
    return {
      Background: () => (
        <>
          {/* Deep rich mahogany/crimson base */}
          <div className="absolute inset-0 bg-[#7f1d1d] z-0"></div>

          {/* Gold Geometric Pattern */}
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
      // THE FIX: Added -mt-16 to pull the text up and pt-0 to remove top padding
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-5 pt-0 flex flex-col grow gap-1',

      // Sizing and Shadow for readability
      nameClass: 'text-[#fcd34d] font-serif font-black text-4xl tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]',
      fontClass: 'font-sans font-bold uppercase text-[11px] tracking-[0.25em] text-amber-200/90 border-none mt-0',

      // THE FIX: Reduced mb-2 to stop pushing the text down
      imageBorder: 'border-[6px] border-[#451a03] bg-[#fef3c7] p-2 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10 m-6 mb-2',

      buttonClass: 'mt-auto mb-6 bg-transparent text-[#fcd34d] font-serif font-bold border-[3px] border-[#fcd34d] hover:bg-[#fcd34d] hover:text-[#7f1d1d] transition-all py-3 tracking-widest uppercase',
      icon: '🎭'
    };
  }

  // 5. PJOK / OLAHRAGA -> "The Olympic Track & Vitality" (High Density, Sport/Health Focus)
  else if (lowerSub.match(/(jasmani|olahraga|kesehatan|physical|health|gym|sports)/)) {
    return {
      Background: () => (
        <>
          {/* Base: Classic Running Track Red */}
          <div className="absolute inset-0 bg-[#b91c1c] z-0"></div>

          {/* LAYER 1: Giant Faded Fitness & Sports Stats */}
          <div className="absolute -left-12 top-4 opacity-[0.15] font-mono font-black text-[120px] italic text-white pointer-events-none leading-none -rotate-6">
            145 BPM
          </div>
          <div className="absolute -right-20 bottom-20 opacity-[0.1] font-sans font-black text-[180px] italic text-white pointer-events-none leading-none rotate-3">
            00:59
          </div>
          <div className="absolute left-1/4 top-1/3 opacity-[0.05] font-sans font-black text-[150px] uppercase italic text-white pointer-events-none leading-none -rotate-12">
            Sprint
          </div>

          {/* LAYER 2: Running Track Lanes & Health EKG Line */}
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <svg width="100%" height="100%">
              {/* Sweeping Olympic Track Lanes */}
              <path d="M -50 400 Q 150 500 400 100" fill="none" stroke="white" strokeWidth="6" />
              <path d="M -50 430 Q 170 530 430 100" fill="none" stroke="white" strokeWidth="6" />
              <path d="M -50 460 Q 190 560 460 100" fill="none" stroke="white" strokeWidth="6" />
              
              {/* Giant Neon Green EKG / Heartbeat Line (Representing Health) */}
              <path d="M 0 600 L 100 600 L 130 500 L 160 650 L 190 550 L 220 600 L 400 600" fill="none" stroke="#4ade80" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]"/>
            </svg>
          </div>

          {/* LAYER 3: Health & First Aid Graphic */}
          <div className="absolute top-10 right-6 opacity-80 pointer-events-none z-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              {/* Medical/Health Cross */}
              <div className="w-8 h-8 bg-[#b91c1c] relative" style={{ clipPath: 'polygon(33% 0, 66% 0, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0 66%, 0 33%, 33% 33%)' }}></div>
            </div>
          </div>
        </>
      ),
      // THE CONTAINER: Lifted high (-mt-16), completely transparent
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-9 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: "Athletic Speed" Font. 
      // Skewed (leaning forward) to look fast, white with a deep red shadow.
      nameClass: 'text-white font-sans font-black text-5xl uppercase italic tracking-tighter drop-shadow-[4px_4px_0_#7f1d1d] transform -skew-x-6 w-fit leading-none',
      
      // UNIQUE SUB-TEXT: High-visibility neon yellow, looks like sports apparel branding
      fontClass: 'bg-[#fde047] text-black font-sans font-black uppercase text-[11px] tracking-[0.2em] px-3 py-1 shadow-[4px_4px_0_#7f1d1d] w-fit mt-2 transform -skew-x-6',
      
      // UNIQUE IMAGE: Clean, dynamic sports magazine layout. 
      // Bright white border with a neon green inner accent.
      imageBorder: 'border-[8px] border-white bg-[#4ade80] p-1 shadow-[0_20px_30px_rgba(0,0,0,0.4)] z-10 m-6 mb-2 rotate-2 hover:-rotate-1 transition-transform duration-500',
      
      // UNIQUE BUTTON: Action stopwatch aesthetic.
      buttonClass: 'mt-auto mb-6 bg-white text-[#b91c1c] font-black italic border-[4px] border-white hover:bg-transparent hover:text-white hover:border-white shadow-[0_8px_0_#7f1d1d] active:translate-y-[6px] active:shadow-none transition-all py-3 tracking-widest uppercase transform -skew-x-6',
      icon: '👟' // Running shoe icon
    };
  }

  // 6. ILMU PENGETAHUAN ALAM (IPA / Science) -> "The Research Lab Archive" (High Density)
  else if (lowerSub.match(/(alam|ipa|science|biologi|fisika|kimia)/)) {
    return {
      Background: () => (
        <>
          {/* Deep Dark Space Blue Base */}
          <div className="absolute inset-0 bg-[#020617] z-0"></div>

          {/* LAYER 1: Crowded Science Data (Multiple Subjects) */}
          <div className="absolute inset-0 z-0 opacity-10 font-mono text-[8px] leading-tight p-2 columns-4 md:columns-5 overflow-hidden pointer-events-none text-[#22d3ee]">
             {/* Chemistry: Molecule names & structures */}
             {Array(10).fill("H2O (Water) | CO2 (Carbon Dioxide) | NaCl (Salt) | CH4 (Methane) | C6H12O6 (Glucose) | ").join("")}
             {/* Physics: Formulas */}
             {Array(10).fill("F=ma | E=mc^2 | V=IR | KE=1/2mv^2 | P=m/v | G=6.67x10^-11 | ").join("")}
             {/* Biology: Terms */}
             {Array(10).fill("DNA (Deoxyribonucleic Acid) | Mitochondria | Mitosis | Photosynthesis | Eukaryote | Prokaryote | ").join("")}
          </div>

          {/* LAYER 2: Large Faded Quantum Hexagon Pattern */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="hexagons" width="60" height="104.282" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M 60 25.98 L 30 8.66 L 0 25.98 L 0 60.62 L 30 77.94 L 60 60.62 Z" fill="none" stroke="#22d3ee" strokeWidth="2" />
                {/* Active connecting nodes */}
                <circle cx="30" cy="8.66" r="3" fill="#06b6d4" />
                <circle cx="0" cy="60.62" r="3" fill="#06b6d4" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
          
          {/* LAYER 3: Glowing Bio-Tech Green Spotlights */}
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-[#4ade80] opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        </>
      ),
      // Lifted, transparent (no box)
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-5 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Glowing Neon Cyan
      nameClass: 'text-[#22d3ee] font-sans font-black text-4xl uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] leading-none',
      
      // UNIQUE SUB-TEXT: Slanted marker pen style (Bio-Tech Green)
      fontClass: 'font-mono font-bold text-[#4ade80] uppercase text-[10px] tracking-[0.25em] mt-1 -rotate-1',
      
      // UNIQUE IMAGE: "Lab Glass Blueprint" frame
      // Neon Cyan frame with an inner Bio-Tech Green glow
      imageBorder: 'border-[6px] border-[#22d3ee] bg-[#082f49] p-2 shadow-[0_0_25px_rgba(34,211,238,0.5)] z-10 m-6 mb-2 hover:scale-[1.02] transition-transform duration-500',
      
      // UNIQUE BUTTON: Cyber/Neon Ghost Button
      buttonClass: 'mt-auto mb-6 bg-black text-[#22d3ee] font-mono font-black border-[3px] border-[#22d3ee] hover:bg-[#22d3ee] hover:text-[#020617] hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all py-3 tracking-widest uppercase',
      icon: '🧬' 
    };
  }

  // 7. ILMU PENGETAHUAN SOSIAL (IPS / Social) -> "The Antique Leather Map" (Dark & Crowded)
  else if (lowerSub.match(/(sosial|ips|sejarah|geografi|ekonomi|sosiologi)/)) {
    return {
      Background: () => (
        <>
          {/* THE FIX: Changed from pale cream to Deep Antique Leather / Espresso */}
          <div className="absolute inset-0 bg-[#291204] z-0"></div>

          {/* LAYER 1: Topographic Contour Lines (Now Gold/Brass) */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%">
              <path d="M -50 100 Q 150 50 300 200 T 500 100 M -50 120 Q 140 70 290 220 T 500 120" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
              <path d="M -50 300 Q 200 400 350 250 T 600 400 M -50 320 Q 190 420 340 270 T 600 420" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
            </svg>
          </div>

          {/* LAYER 2: Crowded Historical Annotations (Now glowing faint gold) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15] p-6 font-serif text-[#fef3c7]">
            <div className="absolute top-10 left-10 text-4xl rotate-12">1945</div>
            <div className="absolute top-40 right-10 text-3xl -rotate-6">MAJAPAHIT</div>
            <div className="absolute bottom-20 left-1/4 text-2xl rotate-3">6.2° S, 106.8° E</div>
            <div className="absolute top-1/2 left-5 text-5xl opacity-40">💹</div>
            <div className="absolute bottom-10 right-20 text-4xl -rotate-12 font-black">HISTORY</div>
            <div className="absolute top-1/4 right-1/4 text-6xl opacity-20">IDR</div>
          </div>

          {/* LAYER 3: Large Faded Compass Rose (Now Brass colored) */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="#fbbf24" className="text-[#fbbf24]">
              <circle cx="50" cy="50" r="45" strokeWidth="1"/>
              <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" strokeWidth="1"/>
            </svg>
          </div>

          {/* LAYER 4: "Official" Wax Seal (Kept Crimson Red for contrast) */}
          <div className="absolute top-12 right-6 w-20 h-20 rounded-full border-4 border-dashed border-[#dc2626] opacity-50 flex items-center justify-center rotate-12 pointer-events-none">
             <span className="text-[#dc2626] font-black text-[10px] text-center uppercase">Approved<br/>Archive</span>
          </div>
        </>
      ),
      // Lifted (-mt-16) and completely transparent
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-7 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Now Bright Antique Gold with a hard black shadow so it pops off the dark background
      nameClass: 'text-[#fbbf24] font-serif font-black text-4xl uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] leading-none',
      
      // UNIQUE SUB-TEXT: Dark leather box with gold text
      fontClass: 'bg-[#451a03] text-[#fbbf24] font-serif font-bold uppercase text-[10px] tracking-[0.2em] px-2 py-0.5 w-fit mt-1 border border-[#fbbf24] shadow-[3px_3px_0_rgba(0,0,0,1)]',
      
      // UNIQUE IMAGE: "Explorer's Map Case" - Black frame with an inner gold line
      imageBorder: 'border-[6px] border-black bg-[#fbbf24] p-1.5 shadow-[12px_12px_0_rgba(0,0,0,0.6)] z-10 m-6 mb-2 -rotate-1 hover:rotate-0 transition-transform duration-500',
      
      // UNIQUE BUTTON: Bright Gold "Brass" button
      buttonClass: 'mt-auto mb-6 bg-black text-[#fbbf24] font-serif font-bold border-[3px] border-[#fbbf24] hover:bg-[#fbbf24] hover:text-black active:translate-y-1 shadow-[5px_5px_0_rgba(0,0,0,1)] hover:shadow-none transition-all py-3 tracking-widest uppercase',
      icon: '🏛️' 
    };
  }
  
  // 8. AGAMA ISLAM -> "Sacred Illumination & Geometry" (High Density)
  else if (lowerSub.match(/(agama|islam|pai|budi|pekerti)/)) {
    return {
      Background: () => (
        <>
          {/* Deep Emerald Green Base */}
          <div className="absolute inset-0 bg-[#064e3b] z-0"></div>

          {/* LAYER 1: Dense Islamic Geometric Star Pattern */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="islamic-star" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <path d="M30 0 L35 25 L60 30 L35 35 L30 60 L25 35 L0 30 L25 25 Z" fill="none" stroke="#fbbf24" strokeWidth="1" />
                <rect x="15" y="15" width="30" height="30" fill="none" stroke="#fbbf24" strokeWidth="0.5" transform="rotate(45 30 30)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#islamic-star)" />
            </svg>
          </div>

          {/* LAYER 2: Giant Overlapping Abstract Crescent & Stars */}
          <div className="absolute -top-20 -right-20 w-100 h-100 border border-[#fde68a] rounded-full opacity-10 pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-75 h-75 border-4 border-[#fde68a] rounded-full opacity-[0.05] pointer-events-none"></div>
          
          {/* LAYER 3: Faint Glowing Grid & Lantern Glow */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-[#047857]/50 via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 z-0 opacity-[0.05] font-serif text-[12px] leading-tight p-4 columns-3 overflow-hidden text-[#fde68a] text-justify">
            {Array(30).fill("Knowledge Belief Morality Wisdom Compassion Justice Faith ").join("")}
          </div>
        </>
      ),
      // Container: Elevated, transparent
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-5 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Brilliant Gold Serif with a deep green shadow
      nameClass: 'text-[#fde68a] font-serif font-black text-4xl tracking-tight drop-shadow-[0_4px_4px_rgba(2,44,34,1)] leading-none',
      fontClass: 'text-[#34d399] font-sans font-bold uppercase text-[11px] tracking-[0.25em] mt-1 drop-shadow-md',
      
      // UNIQUE IMAGE: Ornate "Arch" or manuscript frame (Gold and Dark Green)
      imageBorder: 'border-x-[6px] border-b-[6px] border-t-[12px] border-[#fbbf24] bg-[#022c22] p-1.5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10 m-6 mb-2',
      
      // UNIQUE BUTTON: Elegant Gold Trim
      buttonClass: 'mt-auto mb-6 bg-[#022c22] text-[#fde68a] font-serif font-bold border-[2px] border-[#fbbf24] hover:bg-[#fbbf24] hover:text-[#064e3b] shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all py-3 tracking-widest uppercase',
      icon: '🕌' 
    };
  }

  // 9. PENDIDIKAN KEWARGANEGARAAN (PKN) -> "The Patriot's Canvas" (High Density)
  else if (lowerSub.match(/(kewarganegaraan|pkn|pancasila|civic|ppkn)/)) {
    return {
      Background: () => (
        <>
          {/* Deep Crimson Base */}
          <div className="absolute inset-0 bg-[#7f1d1d] z-0"></div>

          {/* LAYER 1: Dense Constitutional Text */}
          <div className="absolute inset-0 z-0 opacity-10 font-serif text-[8px] leading-tight p-2 columns-4 overflow-hidden pointer-events-none text-white text-justify">
             {Array(20).fill("Bahwa sesungguhnya Kemerdekaan itu ialah hak segala bangsa dan oleh sebab itu, maka penjajahan di atas dunia harus dihapuskan. ").join("")}
          </div>

          {/* LAYER 2: Giant Nationalism Typographic Elements */}
          <div className="absolute top-10 -left-10 opacity-[0.08] font-black text-[120px] italic text-white pointer-events-none leading-none -rotate-6">
            1945
          </div>
          <div className="absolute bottom-20 -right-20 opacity-[0.05] font-black text-[100px] text-white pointer-events-none leading-none rotate-12">
            PANCASILA
          </div>
          <div className="absolute top-1/2 left-4 opacity-20 font-black text-5xl text-white pointer-events-none leading-none rotate-90">
            NKRI
          </div>

          {/* LAYER 3: Abstract Geometric Shards (Red & White) */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <path d="M 0 0 L 200 600 L 220 600 L 20 0 Z" fill="white" />
              <path d="M 100 0 L 300 800 L 310 800 L 110 0 Z" fill="white" opacity="0.5" />
            </svg>
          </div>
        </>
      ),
      // Container: Elevated, transparent
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-7 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Stark White, heavy block letters with a dark shadow
      nameClass: 'text-white font-sans font-black text-5xl uppercase italic tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)] leading-none',
      fontClass: 'bg-white text-[#991b1b] font-black uppercase text-[11px] tracking-[0.3em] px-2 py-0.5 mt-1 w-fit shadow-[4px_4px_0_rgba(0,0,0,0.8)] -rotate-1',
      
      // UNIQUE IMAGE: "Official Document" stamp look. Thick white/black border.
      imageBorder: 'border-[8px] border-white bg-black p-1 shadow-[10px_10px_0_rgba(0,0,0,0.5)] z-10 m-6 mb-2 rotate-2 hover:-rotate-1 transition-transform duration-500',
      
      // UNIQUE BUTTON: Bold Red and White contrast
      buttonClass: 'mt-auto mb-6 bg-white text-[#991b1b] font-black italic border-[4px] border-black hover:bg-black hover:text-white hover:border-black active:translate-y-1 shadow-[6px_6px_0_rgba(0,0,0,1)] hover:shadow-none transition-all py-3 tracking-widest uppercase',
      icon: '🦅' // Eagle/Garuda icon
    };
  }

  // 10. MUATAN LOKAL -> "The Woven Heritage" (High Density)
  else if (lowerSub.match(/(muatan|lokal|mulok|budaya|daerah)/)) {
    return {
      Background: () => (
        <>
          {/* Warm Terracotta / Wood Base */}
          <div className="absolute inset-0 bg-[#78350f] z-0"></div>

          {/* LAYER 1: Dense Woven Textile Pattern (Ulos/Songket inspiration) */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="weave" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="#fcd34d" strokeWidth="1.5" />
                <path d="M 10 10 L 30 30 M 30 10 L 10 30" stroke="#fcd34d" strokeWidth="1" opacity="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#weave)" />
            </svg>
          </div>

          {/* LAYER 2: Giant Cultural Typography / Greetings */}
          <div className="absolute top-20 -left-4 opacity-[0.06] font-serif font-black text-[120px] text-[#fef3c7] pointer-events-none leading-none rotate-90 tracking-widest">
            HORAS
          </div>
          <div className="absolute bottom-10 -right-10 opacity-[0.05] font-serif font-black text-[100px] text-[#fef3c7] pointer-events-none leading-none -rotate-12">
            MEJUAH
          </div>

          {/* LAYER 3: Organic Wood/Leaf Shadows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-black opacity-20 blur-[50px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f59e0b] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
        </>
      ),
      // Container: Elevated, transparent
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-7 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Vibrant Mustard Yellow with deep brown shadow
      nameClass: 'text-[#fcd34d] font-serif font-black text-4xl uppercase tracking-wider drop-shadow-[2px_4px_0_rgba(69,26,3,1)] leading-none',
      fontClass: 'text-[#fef3c7] font-sans font-bold uppercase text-[11px] tracking-[0.3em] mt-1 bg-[#451a03] w-fit px-2 py-0.5 rounded-sm shadow-[2px_2px_0_rgba(0,0,0,0.5)]',
      
      // UNIQUE IMAGE: "Carved Wood" Frame aesthetic
      imageBorder: 'border-[6px] border-[#451a03] bg-[#b45309] p-1.5 shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-10 m-6 mb-2 rounded-sm rotate-1 hover:-rotate-1 transition-transform duration-500',
      
      // UNIQUE BUTTON: Earthy, warm button with thick borders
      buttonClass: 'mt-auto mb-6 bg-[#451a03] text-[#fcd34d] font-serif font-bold border-[3px] border-[#fcd34d] hover:bg-[#fcd34d] hover:text-[#451a03] shadow-[4px_4px_0_rgba(0,0,0,0.8)] active:translate-y-1 hover:shadow-none transition-all py-3 tracking-widest uppercase',
      icon: '🌿' // Leaf/Nature icon
    };
  }

  // 11. BIMBINGAN KONSELING (BK / Counseling) -> "The Neural Journal" (High Density, Introspective)
  else if (lowerSub.match(/(bimbingan|konseling|bk|counseling|psikologi)/)) {
    return {
      Background: () => (
        <>
          {/* Deep Introspective Indigo/Amethyst Base */}
          <div className="absolute inset-0 bg-[#1e1b4b] z-0"></div>

          {/* LAYER 1: Dense "Journaling & Thoughts" Text */}
          <div className="absolute inset-0 z-0 opacity-10 font-serif text-[10px] leading-relaxed p-4 columns-3 overflow-hidden pointer-events-none text-[#e0e7ff] text-justify italic">
             {Array(15).fill("How do you feel today? What are your dreams for the future? Every step is progress. Your mental health matters. Navigate your career path with clarity. ").join("")}
          </div>

          {/* LAYER 2: Giant Psychological Typography */}
          <div className="absolute top-1/4 -left-10 opacity-[0.06] font-sans font-black text-[100px] text-[#fbcfe8] pointer-events-none leading-none -rotate-12 tracking-widest">
            EMPATHY
          </div>
          <div className="absolute bottom-10 -right-4 opacity-[0.04] font-serif font-black text-[120px] text-[#818cf8] pointer-events-none leading-none rotate-6">
            GROWTH
          </div>

          {/* LAYER 3: Neural Network / Synapse Connections (Psychology) */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg width="100%" height="100%">
              {/* Abstract connected nodes representing thoughts/mind */}
              <path d="M 50 100 L 150 150 L 100 300 L 250 250 L 350 400 L 200 500" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M 300 50 L 250 250 L 400 200 L 350 400" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.6" />
              
              <circle cx="50" cy="100" r="4" fill="#a78bfa" />
              <circle cx="150" cy="150" r="5" fill="#f472b6" />
              <circle cx="100" cy="300" r="3" fill="#a78bfa" />
              <circle cx="250" cy="250" r="6" fill="#e0e7ff" />
              <circle cx="350" cy="400" r="4" fill="#f472b6" />
              <circle cx="200" cy="500" r="5" fill="#a78bfa" />
              <circle cx="300" cy="50" r="3" fill="#e0e7ff" />
              <circle cx="400" cy="200" r="4" fill="#a78bfa" />
            </svg>
          </div>

          {/* LAYER 4: Soft Therapeutic Glows (Safe Space vibe) */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c084fc] opacity-20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-20 left-[-10%] w-72 h-72 bg-[#f472b6] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
        </>
      ),
      // Container: Elevated, transparent (No Box)
      glassClass: 'bg-transparent border-none shadow-none z-10 m-6 -mt-6 pt-0 flex flex-col grow gap-1',
      
      // UNIQUE TEXT: Soft Rose-Pink with a glowing psychological aura
      nameClass: 'text-[#fbcfe8] font-serif font-black text-4xl tracking-tight drop-shadow-[0_0_12px_rgba(244,114,182,0.5)] leading-none',
      
      // UNIQUE SUB-TEXT: Deep Indigo pill-shape to contrast the glowing name
      fontClass: 'bg-[#fbcfe8] text-[#1e1b4b] font-sans font-bold uppercase text-[10px] tracking-[0.25em] px-3 py-1 rounded-full w-fit mt-1 shadow-[0_4px_10px_rgba(0,0,0,0.4)]',
      
      // UNIQUE IMAGE: "Mindful Frame" 
      // Soft pink outer border with a deep indigo inner matte
      imageBorder: 'border-[6px] border-[#fbcfe8] bg-[#312e81] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10 m-6 mb-2 rounded-[2rem] hover:rounded-xl transition-all duration-500',
      
      // UNIQUE BUTTON: "Open Door" Ghost Button
      buttonClass: 'mt-auto mb-6 bg-transparent text-[#fbcfe8] font-sans font-bold border-[2px] border-[#fbcfe8] hover:bg-[#fbcfe8] hover:text-[#1e1b4b] hover:shadow-[0_0_20px_rgba(244,114,182,0.6)] active:scale-95 transition-all py-3 tracking-widest uppercase rounded-full',
      icon: '🧠' // Brain icon (or you could use 🌱 for growth)
    };
  }

  // 5. Default/Humanities -> Cream Lined Paper
  else {
    return {
      Background: () => (
        <>
          <div className="absolute inset-0 bg-[#FEFCF5] z-0"></div>
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #cbd5e1 95%)', backgroundSize: '100% 24px' }}></div>
        </>
      ),
      glassClass: 'bg-[#FEFCF5]/90 border-t-2 border-black pt-3 z-10',
      nameClass: 'text-black',
      fontClass: 'font-serif font-bold text-emerald-800 border-black',
      imageBorder: 'border-b-4 border-black z-10',
      buttonClass: 'bg-black text-white border-4 border-black hover:bg-emerald-600 shadow-[4px_4px_0px_rgba(0,0,0,1)]',
      icon: '📚'
    };
  }
};

export const PageCover = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div className="w-full h-full border-4 border-black overflow-hidden flex flex-col justify-center items-center">
        <div className="p-4 w-full h-full border-8 border-white bg-black text-white flex flex-col justify-center items-center text-center">
          <p className="font-bold text-pink-500 uppercase tracking-widest mb-2 border-2 border-pink-500 px-3 py-1 rounded-full animate-pulse text-[10px]">
            Tahun Ajaran 2025/2026
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-3">
            Guru-guru Terbaik<br />SMP PAB 5
          </h1>
          <p className="text-xs font-bold text-cyan-400">Geser untuk buka</p>
        </div>
      </div>
    </div>
  );
});

export const ClosingPage = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div className="w-full h-full border-y-4 border-black border-r-4 border-l-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col justify-center items-center p-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3 text-black">Terima kasih!</h2>
        <p className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-widest">Your vote makes a difference.</p>
      </div>
    </div>
  );
});

export const Page = React.forwardRef((props, ref) => {
  const theme = getSubjectTheme(props.subject);
  const ThemeBackground = theme.Background; 

  // --- PLACE handleVote HERE ---
  const handleVote = async () => {
    try {
      let user = auth.currentUser;
      
      // If not logged in, show the Google popup
      if (!user) {
        const result = await signInWithPopup(auth, googleProvider);
        user = result.user;
      }

      // Check Firestore to see if this email has voted already
      const userVoteRef = doc(db, "voters", user.email);
      const userVoteDoc = await getDoc(userVoteRef);

      if (userVoteDoc.exists()) {
        alert("Maaf, Anda sudah memberikan suara sebelumnya!");
        return;
      }

      // Save the vote and lock the email
      await setDoc(userVoteRef, {
        votedFor: props.name,
        subject: props.subject,
        voterName: user.displayName,
        votedAt: new Date()
      });

      alert(`Terima kasih! Suara Anda untuk ${props.name} telah direkam.`);

    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Pastikan koneksi internet Anda lancar.");
    }
  };

  return (
    <div ref={ref} className="bg-[#FEFCF5]">
      <div 
        className={`w-full h-full border-y-4 border-black border-r-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col relative ${props.number % 2 === 0 ? 'border-l-4' : 'border-l-0'}`} 
      >
        <ThemeBackground />

        <div className="grow flex flex-col h-full bg-transparent relative z-10 group">
          
          <div className={`relative h-[60%] p-2 md:p-3 ${theme.imageBorder}`} style={{ backgroundColor: props.color }}>
             <img 
                src={props.image} 
                alt={props.name} 
                className="w-full h-full object-cover border-4 border-black grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
          </div>
          
          <div className={`p-3 md:p-5 flex flex-col gap-3 md:gap-4 grow ${theme.glassClass}`}>
            <div>
              <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1 leading-none ${theme.nameClass}`}>
                {props.name}
              </h2>
              <p className={`text-sm md:text-base border-t-2 pt-1 flex items-center gap-2 ${theme.fontClass}`}>
                <span>{theme.icon}</span> {props.subject}
              </p>
            </div>
            
            <button 
              onClick={handleVote}
              className={`w-full py-2 md:py-3 font-black text-sm md:text-base uppercase tracking-widest transition-all active:translate-y-1 active:translate-x-1 cursor-pointer z-50 mt-auto ${theme.buttonClass}`}
            >
              Cast Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});