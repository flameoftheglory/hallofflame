import { useMemo } from "react";
import { motion } from "framer-motion";
import { getKing } from "@/lib/mockData";
import { FlameBackground } from "@/components/FlameBackground";
import { Navbar } from "@/components/Navbar";
import kingAvatarImg from "@assets/generated_images/solana_cyberpunk_king_avatar.png";
import throneImg from "@assets/generated_images/apocalyptic_cyberpunk_throne.png";

export default function Home() {
  const king = useMemo(() => getKing(), []);

  if (!king) return null;

  return (
    <FlameBackground intensity="high" videoEnabled={true}>
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
        <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px] mt-10 flex items-center justify-center group">
          
          {/* Throne Image */}
          <motion.img 
            src={throneImg} 
            alt="Throne" 
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(147,51,234,0.3)] relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* King Avatar - Positioned ON the throne (overlay) */}
          <motion.div 
            className="absolute top-[20%] left-[50%] transform -translate-x-1/2 z-20 w-[60%] h-[60%]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Avatar Image - Needs masking to sit 'in' the throne ideally, but overlay works for sci-fi hologram style */}
            <img 
              src={kingAvatarImg} 
              alt="King Avatar" 
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(20,241,149,0.6)] mix-blend-screen opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Hologram Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay pointer-events-none animate-pulse" />
          </motion.div>

          {/* Background Glow behind throne */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full z-0 animate-pulse" />
          
          {/* Crown Icon Floating */}
          <motion.div 
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl filter drop-shadow-[0_0_20px_gold] z-30"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            👑
          </motion.div>
        </div>

        {/* King Stats */}
        <motion.div 
          className="mt-4 md:mt-0 text-center p-6 bg-black/60 backdrop-blur-md border border-primary/30 rounded-lg max-w-md mx-4 box-glow relative z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black border border-primary/50 px-2 py-1 rounded text-[10px] text-primary uppercase tracking-widest">
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
        </motion.div>

      </main>
    </FlameBackground>
  );
}
