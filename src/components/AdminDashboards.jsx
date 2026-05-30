import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import { teachersData } from "../teachersData"; // Import your existing teacher data array

export default function AdminDashboard() {
  const [winnerProfile, setWinnerProfile] = useState(null);
  const [hasVotes, setHasVotes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndDetermineWinner = async () => {
      try {
        // 1. Fetch all votes from Firestore
        const querySnapshot = await getDocs(collection(db, "voters"));
        
        const tallies = {};

        // 2. Count votes per teacher
        querySnapshot.forEach((doc) => {
          const voteData = doc.data();
          const teacherName = voteData.votedFor;
          
          if (tallies[teacherName]) {
            tallies[teacherName] += 1;
          } else {
            tallies[teacherName] = 1;
          }
        });

        // 3. Convert to array and sort from highest to lowest
        const sortedResults = Object.entries(tallies)
          .map(([name, votes]) => ({ name, votes }))
          .sort((a, b) => b.votes - a.votes);

        // 4. Find the winner's matching static local data (image, color)
        if (sortedResults.length > 0) {
          const topTeacherName = sortedResults[0].name;
          
          // Match the Firestore name against your local teachersData array
          const localMatch = teachersData.find(
            (t) => t.name.toLowerCase() === topTeacherName.toLowerCase()
          );

          setWinnerProfile({
            name: topTeacherName,
            // Fallback parameters just in case a name mismatch occurs
            image: localMatch ? localMatch.image : null,
            color: localMatch ? localMatch.color : '#F5B800' 
          });
          
          setHasVotes(true);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndDetermineWinner();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A4D22] flex items-center justify-center font-['Space_Grotesk']">
        <div className="text-[#e4ff1a] text-2xl font-black animate-pulse tracking-widest">
          MENGHITUNG SUARA...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A4D22] p-4 sm:p-8 font-['Space_Grotesk'] text-white flex items-center justify-center selection:bg-[#F5B800] selection:text-[#0F7132]">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-sm border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-6 sm:p-8 relative overflow-hidden text-center">
        
        {/* Decorative Crown Background Graphic */}
        <div className="absolute -top-5 -right-5 opacity-10 text-[150px] pointer-events-none select-none">
          👑
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-300 tracking-tighter mb-6">
          Pemenang Polling
        </h1>

        {hasVotes && winnerProfile ? (
          <div className="flex flex-col items-center gap-6 bg-[#e4ff1a] text-black border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 sm:p-8 transform hover:scale-[1.01] transition-transform">
            
            {/* DYNAMIC IMAGE FRAME: Styled like a premium poster print */}
            {winnerProfile.image ? (
              <div 
                className="relative w-48 h-64 border-[6px] border-black p-1 shadow-[6px_6px_0px_rgba(0,0,0,0.25)] rounded-sm overflow-hidden transform -rotate-1"
                style={{ backgroundColor: winnerProfile.color }}
              >
                <img 
                  src={winnerProfile.image} 
                  alt={winnerProfile.name} 
                  className="w-full h-full object-cover border-2 border-black" 
                />
                {/* Floating crown badge on the picture itself */}
                <span className="absolute top-2 right-2 text-3xl drop-shadow-md animate-bounce">👑</span>
              </div>
            ) : (
              <span className="text-6xl animate-bounce">👑</span>
            )}
            
            <div className="my-1">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#0A4D22] mb-2">
                Selamat Kepada
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none break-words max-w-full">
                {winnerProfile.name}
              </h2>
            </div>

            <div className="border-t-2 border-black/10 pt-4 w-full text-xs font-bold uppercase tracking-widest text-black/70">
              Guru Pilihan Terbaik Siswa 🎉
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 font-bold border-2 border-dashed border-gray-600">
            Belum ada data suara yang masuk.
          </div>
        )}
      </div>
    </div>
  );
}