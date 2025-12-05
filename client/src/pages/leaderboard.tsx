import { useMemo } from "react";
import { motion } from "framer-motion";
import { getLeaderboard, User } from "@/lib/mockData";
import { FlameBackground } from "@/components/FlameBackground";
import { Navbar } from "@/components/Navbar";
import { Avatar } from "@/components/Avatar";
import { cn } from "@/lib/utils";
import staircaseImg from "@assets/generated_images/infernal_digital_staircase.png";

export default function Leaderboard() {
  const allUsers = useMemo(() => getLeaderboard(), []);
  // Top 2-10 for the visual staircase/grid
  const topUsers = allUsers.slice(0, 9); 
  // Rest for the table
  const restUsers = allUsers.slice(9);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <FlameBackground intensity="low">
      <Navbar />
      
      {/* Staircase Visual Section */}
      <div className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
         {/* Background Staircase Image */}
         <div 
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: `url(${staircaseImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-0" />

        <div className="relative z-10 w-full max-w-6xl px-4 py-12 pt-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold uppercase tracking-widest text-white mb-2 drop-shadow-md">
              Infernal <span className="text-primary">Staircase</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm">Those who seek the throne</p>
          </div>

          {/* Grid Layout for Top Users - Stylized as steps */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {topUsers.map((user, index) => (
              <motion.div 
                key={user.address}
                variants={item}
                className={cn(
                  "relative group bg-black/40 backdrop-blur-sm border border-white/10 p-4 rounded-lg hover:bg-black/60 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,69,0,0.2)]",
                  // Stylistic offsets to simulate "steps" visually if screen allows, otherwise grid
                  index % 3 === 0 ? "md:translate-y-0" : 
                  index % 3 === 1 ? "md:translate-y-8" : "md:translate-y-16"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-black font-bold text-xs flex items-center justify-center rounded-full border border-white">
                      #{user.rank}
                    </div>
                    <Avatar seed={user.address} size={50} />
                  </div>
                  
                  <div className="overflow-hidden">
                    <p className="font-mono text-white text-sm truncate w-32 opacity-80 group-hover:opacity-100 transition-opacity">
                      {user.address}
                    </p>
                    <p className="text-primary font-bold text-lg flex items-center gap-1">
                      <span className="text-xs text-gray-500">BURNED:</span>
                      {user.amountBurned.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Rest of the List - Table Style */}
      <div className="w-full bg-black py-12 relative z-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-mono text-gray-500 uppercase tracking-widest mb-6 text-sm">The Purgatory (Rank 11+)</h3>
          
          <div className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-gray-400 font-mono text-xs uppercase">
                  <th className="p-4">Rank</th>
                  <th className="p-4">User</th>
                  <th className="p-4 text-right">Burned Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {restUsers.map((user) => (
                  <tr key={user.address} className="hover:bg-white/5 transition-colors font-mono text-sm">
                    <td className="p-4 text-gray-500">#{user.rank}</td>
                    <td className="p-4 text-white">
                      <div className="flex items-center gap-3">
                        <Avatar seed={user.address} size={24} />
                        <span className="opacity-70">{user.address}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right text-primary">{user.amountBurned.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </FlameBackground>
  );
}
