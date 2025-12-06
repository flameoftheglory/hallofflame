import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Flame, Wallet, LogOut, ChevronRight } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { AvatarCreator } from "@/components/AvatarCreator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock Wallet Icons (SVG)
const PhantomIcon = () => (
  <svg viewBox="0 0 128 128" className="w-6 h-6 mr-3">
    <path fill="#AB9FF2" d="M98.7 20.4C89 10.1 75.6 4.3 61.5 4.3c-28 0-51.4 20.5-55.9 47.6C2.7 69.6 0 86.6 0 86.6s16.6 19.3 36.6 19.3c12.6 0 23.1-6.3 29.3-16.2 5.6 5.6 13.3 8.8 21.4 8.8 17.3 0 31.3-14 31.3-31.3V27.8c0-2.6-.9-5.1-2.7-7.4z"/>
  </svg>
);

const SolflareIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 mr-3">
    <path fill="#FC7226" d="M2.8 12.2c-.4-1.5-1.2-2.8-2.4-3.7C5.9 3.7 13.8 1.6 20.9 2.8c-6.2 3.1-10.8 8.9-12.3 15.9-.9-4.5-3.4-6-5.8-6.5z"/>
    <path fill="#FC7226" d="M20.6 5.6c5.7.8 10.5 4.8 12.5 10.1-4.4-5.3-11.6-7.4-18-5.4 1.7-2.9 3.6-4.3 5.5-4.7z"/>
    <path fill="#FC7226" d="M29.3 23.5c-4.5 6.2-12.4 8.4-19.5 7.3 6.2-3.1 10.8-8.9 12.3-15.9.9 4.5 3.4 6 5.8 6.5.4 1.5 1.2 2.8 2.4 3.7-.3-.5-.7-1.1-1-1.6z"/>
  </svg>
);

export function Navbar() {
  const [location] = useLocation();
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useWallet();
  const [showWalletSelector, setShowWalletSelector] = useState(false);

  const handleConnect = (wallet: string) => {
    connectWallet(wallet);
    setShowWalletSelector(false);
  };

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a className={cn(
          "font-sans text-sm tracking-wider transition-all duration-300 hover:text-primary uppercase flex items-center gap-2",
          isActive ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]" : "text-white/70",
          className
        )}>
          {children}
        </a>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8">
        <div className="w-1/3">
          <NavLink href="/leaderboard">Leaderboard</NavLink>
        </div>
        
        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <a className="font-sans text-xl md:text-2xl font-bold tracking-widest flex items-center gap-2 group cursor-pointer">
              <span className="text-white group-hover:text-primary transition-colors duration-300">HALL OF</span>
              <span className="flame-text animate-pulse">FLAME</span>
              <Flame className="w-5 h-5 text-primary animate-bounce" />
            </a>
          </Link>
        </div>
        
        <div className="w-1/3 flex justify-end items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <AvatarCreator />
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-gray-400 font-mono">Connected</span>
                <span className="text-xs text-primary font-mono font-bold">{walletAddress}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={disconnectWallet}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <button 
              onClick={() => setShowWalletSelector(true)}
              className="px-4 py-2 bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-sm font-mono text-xs md:text-sm uppercase tracking-widest shadow-[0_0_10px_rgba(255,69,0,0.2)] hover:shadow-[0_0_20px_rgba(255,69,0,0.6)] flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Wallet Selector Modal */}
      <Dialog open={showWalletSelector} onOpenChange={setShowWalletSelector}>
        <DialogContent className="bg-black/90 border-primary/20 text-white backdrop-blur-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold uppercase tracking-widest text-center mb-4">
              Select Wallet
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2">
             <button 
               onClick={() => handleConnect("Phantom")}
               className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 transition-all group"
             >
               <div className="flex items-center">
                 <PhantomIcon />
                 <span className="font-bold text-lg">Phantom</span>
               </div>
               <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">Detected</span>
             </button>

             <button 
               onClick={() => handleConnect("Solflare")}
               className="w-full flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 transition-all group"
             >
               <div className="flex items-center">
                 <SolflareIcon />
                 <span className="font-bold text-lg">Solflare</span>
               </div>
             </button>
             
             <div className="pt-4 text-center">
               <p className="text-xs text-gray-500">
                 New to Solana? <a href="#" className="text-primary hover:underline">Learn more</a>
               </p>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
