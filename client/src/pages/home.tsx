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
      
      {/* Fullscreen Video Background */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          // Added transform scale to zoom out (make things look smaller/further away)
          className="w-full h-full object-cover opacity-100 transform scale-75"
        >
          <source src={lavaThroneVideo} type="video/mp4" />
        </video>
        {/* Vignette to darken edges and focus attention on center */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%]" />
      </div>

      <main className="min-h-screen flex flex-col items-center justify-center relative z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 md:top-24 z-20 text-center w-full px-4"
        >
          <h2 className="text-primary font-mono text-sm tracking-[0.5em] uppercase mb-2 text-glow font-bold drop-shadow-md">Leaderboard Top #1</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            CURRENT <span className="flame-text">KING</span>
          </h1>
        </motion.div>

        {/* The Avatar Sitting on the "Video" Throne */}
        <div className="relative w-full h-screen flex items-center justify-center pointer-events-none">
            
          {/* King Avatar Container */}
          {/* REDUCED SIZE: w-[220px] md:w-[350px] (was 280/450) */}
          <motion.div 
            className="absolute top-[38%] md:top-[35%] w-[220px] md:w-[350px]" 
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
              className="absolute -top-[22%] left-1/2 -translate-x-1/2 text-5xl md:text-6xl filter drop-shadow-[0_0_20px_gold] z-30"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              👑
            </motion.div>
          </motion.div>

          {/* King Stats Card */}
          <motion.div 
            className="absolute bottom-8 md:bottom-16 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
             <div className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl max-w-md mx-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-primary/30 transition-colors duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black border border-primary/50 px-3 py-1 rounded-full text-[10px] text-primary uppercase tracking-widest whitespace-nowrap shadow-lg">
                Dominating the Chain
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-1">Wallet Address</p>
                  <p className="font-mono text-lg md:text-xl text-white break-all solana-text font-bold tracking-tight">
                    {king.address}
                  </p>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div>
                  <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-1">Total Burned</p>
                  <p className="text-4xl md:text-5xl font-bold text-primary text-glow font-sans leading-none">
                    {king.amountBurned.toLocaleString()} <span className="text-sm text-white/50 font-normal align-top mt-2 inline-block">$FLAME</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </main>
    </div>
  );
}
