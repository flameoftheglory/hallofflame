import { useMemo } from "react";
import { motion } from "framer-motion";
import { getKing } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import { KingAvatar } from "@/components/KingAvatar";
import lavaThroneVideo from "@assets/lava_throne_background.mp4";

export default function Home() {
  const king = useMemo(() => getKing(), []);

  if (!king) return null;

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black text-white">
      <Navbar />
      
      {/* Fullscreen Video Background - The Throne Room itself */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 w-full h-full object-cover opacity-100 pointer-events-none"
      >
        <source src={lavaThroneVideo} type="video/mp4" />
      </video>

      {/* Overlay for UI readability */}
      <div className="fixed inset-0 z-0 bg-black/20 pointer-events-none" />
      
      <main className="min-h-screen flex flex-col items-center justify-center relative z-10">
        
        {/* Title Section - Push it up a bit */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 md:top-24 z-20 text-center w-full"
        >
          <h2 className="text-primary font-mono text-sm tracking-[0.5em] uppercase mb-2 text-glow font-bold drop-shadow-md">Leaderboard Top #1</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            CURRENT <span className="flame-text">KING</span>
          </h1>
        </motion.div>

        {/* The Avatar Sitting on the "Video" Throne */}
        {/* We need to position this carefully to match the perspective of the video throne */}
        <div className="relative w-full h-screen flex items-center justify-center pointer-events-none">
            
          {/* King Avatar Container */}
          <motion.div 
            // Adjust these values to align with the throne in the video
            className="absolute top-[35%] md:top-[30%] w-[280px] md:w-[450px]" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <KingAvatar 
              seed={king.address} 
              glow 
              className="w-full"
            />
            
            {/* Floating Crown */}
            <motion.div 
              className="absolute -top-[15%] left-1/2 -translate-x-1/2 text-5xl md:text-6xl filter drop-shadow-[0_0_20px_gold] z-30"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              👑
            </motion.div>
          </motion.div>

          {/* King Stats Card - Floating near the bottom */}
          <motion.div 
            className="absolute bottom-10 md:bottom-20 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
             <div className="p-6 bg-black/70 backdrop-blur-md border border-primary/30 rounded-lg max-w-md mx-4 box-glow text-center shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black border border-primary/50 px-2 py-1 rounded text-[10px] text-primary uppercase tracking-widest whitespace-nowrap">
                Dominating the Chain
              </div>
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Wallet Address</p>
              <p className="font-mono text-lg md:text-xl text-white mb-4 break-all solana-text font-bold">
                {king.address}
              </p>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4" />
              
              <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">Total Burned</p>
              <p className="text-3xl md:text-4xl font-bold text-primary text-glow font-sans">
                {king.amountBurned.toLocaleString()} <span className="text-sm text-white/50">$FLAME</span>
              </p>
            </div>
          </motion.div>

        </div>

      </main>
    </div>
  );
}
