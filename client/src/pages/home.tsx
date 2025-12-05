import { useMemo } from "react";
import { motion } from "framer-motion";
import { getKing } from "@/lib/mockData";
import { FlameBackground } from "@/components/FlameBackground";
import { Navbar } from "@/components/Navbar";
import { Avatar } from "@/components/Avatar";
import throneImg from "@assets/generated_images/cyberpunk_obsidian_throne.png";

export default function Home() {
  const king = useMemo(() => getKing(), []);

  if (!king) return null;

  return (
    <FlameBackground intensity="high">
      <Navbar />
      
      <main className="min-h-screen flex flex-col items-center justify-center pt-16 relative">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-24 md:top-32 z-20 text-center"
        >
          <h2 className="text-primary font-mono text-sm tracking-[0.5em] uppercase mb-2 text-glow">Leaderboard Top #1</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            CURRENT <span className="flame-text">KING</span>
          </h1>
        </motion.div>

        {/* Throne Section */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mt-10 flex items-center justify-center">
          
          {/* Throne Image */}
          <motion.img 
            src={throneImg} 
            alt="Throne" 
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(147,51,234,0.3)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* King Avatar - Positioned on the throne */}
          <motion.div 
            className="absolute top-[35%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/30 blur-xl rounded-full animate-pulse" />
              <Avatar 
                seed={king.address} 
                size={120} 
                className="border-4 border-primary shadow-[0_0_30px_rgba(255,69,0,0.8)]"
                glow
              />
              {/* Crown Icon */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl filter drop-shadow-[0_0_10px_gold]">
                👑
              </div>
            </div>
          </motion.div>

          {/* Flames at the bottom of throne */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-2xl" />
        </div>

        {/* King Stats */}
        <motion.div 
          className="mt-8 text-center p-6 bg-black/60 backdrop-blur-md border border-primary/30 rounded-lg max-w-md mx-4 box-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">Wallet Address</p>
          <p className="font-mono text-lg md:text-xl text-white mb-4 break-all solana-text font-bold">
            {king.address}
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4" />
          
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">Total Burned</p>
          <p className="text-3xl md:text-4xl font-bold text-primary text-glow font-sans">
            {king.amountBurned.toLocaleString()} <span className="text-sm text-white/50">$FLAME</span>
          </p>
        </motion.div>

      </main>
    </FlameBackground>
  );
}
