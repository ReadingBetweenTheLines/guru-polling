import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

export default function AdminDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndTallyVotes = async () => {
      try {
        // 1. Extraction: Get all votes
        const querySnapshot = await getDocs(collection(db, "voters"));
        
        const tallies = {};
        let count = 0;

        // 2. Aggregation: Count the votes per teacher
        querySnapshot.forEach((doc) => {
          const voteData = doc.data();
          const teacherName = voteData.votedFor;
          
          if (tallies[teacherName]) {
            tallies[teacherName] += 1;
          } else {
            tallies[teacherName] = 1;
          }
          count++;
        });

        // 3. Sorting: Convert to array and sort highest to lowest
        const sortedResults = Object.entries(tallies)
          .map(([name, votes]) => ({ name, votes }))
          .sort((a, b) => b.votes - a.votes);

        setLeaderboard(sortedResults);
        setTotalVotes(count);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndTallyVotes();
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
    <div className="min-h-screen bg-[#0A4D22] p-4 sm:p-8 font-['Space_Grotesk'] text-white selection:bg-[#F5B800] selection:text-[#0F7132]">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10 text-[200px] pointer-events-none">
          📊
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#e4ff1a] tracking-tighter mb-2 relative z-10">
          Hasil Polling
        </h1>
        <p className="text-lg sm:text-xl font-bold mb-8 border-b-4 border-black pb-4 text-gray-300 relative z-10">
          Total Suara Masuk: <span className="text-white">{totalVotes}</span>
        </p>

        <div className="flex flex-col gap-4 relative z-10">
          {leaderboard.map((result, index) => {
            // Determine styling based on rank
            const isWinner = index === 0;
            const rankStyle = isWinner 
              ? "bg-[#e4ff1a] text-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] scale-[1.02]" 
              : "bg-black/40 text-white border-2 border-white/20";

            return (
              <div key={index} className={`flex items-center justify-between p-4 sm:p-6 transition-transform ${rankStyle}`}>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className={`text-2xl sm:text-4xl font-black ${isWinner ? 'text-black' : 'text-gray-400'}`}>
                    #{index + 1}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                      {result.name}
                      {isWinner && <span className="ml-3 text-2xl" title="Current Leader">👑</span>}
                    </h2>
                  </div>
                </div>
                
                <div className={`text-3xl sm:text-5xl font-black ${isWinner ? 'text-[#0A4D22]' : 'text-[#e4ff1a]'}`}>
                  {result.votes}
                </div>
              </div>
            );
          })}

          {leaderboard.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-bold border-2 border-dashed border-gray-600">
              Belum ada suara yang masuk.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}