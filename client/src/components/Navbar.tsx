import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

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
      
      <div className="w-1/3 flex justify-end">
        <button className="px-4 py-2 bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-sm font-mono text-xs md:text-sm uppercase tracking-widest shadow-[0_0_10px_rgba(255,69,0,0.2)] hover:shadow-[0_0_20px_rgba(255,69,0,0.6)] cursor-not-allowed opacity-80">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
