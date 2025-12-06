import { useMemo } from "react";
import { motion } from "framer-motion";
import { getKing } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import throneImage from "@assets/generated_images/4k_wide_shot_infernal_throne.png";

export default function Home() {
  const king = useMemo(() => getKing(), []);

  if (!king) return null;

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black text-white">
      <Navbar />
      
      {/* Background Image - Ultra High Def Wide Shot Throne */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${throneImage})`,
            // Slight scale down or normal scale to show the "wide" perspective naturally
            // The image itself is wide, so bg-cover handles it well. 
            // We avoid zooming in (scale > 1) to keep it "further back".
          }}
        />
        {/* Vignette to darken edges and focus attention on center */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%]" />
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

        {/* Empty Throne Centerpiece - No Avatar for now */}
        <div className="relative w-full h-screen flex items-center justify-center pointer-events-none">
          
          {/* King Stats Card - Floating near bottom */}
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
