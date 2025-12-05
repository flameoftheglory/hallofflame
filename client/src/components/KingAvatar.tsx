import { useMemo } from "react";
import { cn } from "@/lib/utils";
import solanaAvatar from "@assets/generated_images/sitting_solana_cyberpunk_humanoid.png";
import fireAvatar from "@assets/generated_images/sitting_golden_fire_humanoid.png";
import voidAvatar from "@assets/generated_images/sitting_void_shadow_humanoid.png";

interface KingAvatarProps {
  seed: string;
  size?: number; // This will be relative width percentage for responsiveness
  className?: string;
  glow?: boolean;
}

export function KingAvatar({ seed, className, glow = false }: KingAvatarProps) {
  // Deterministic avatar selection based on seed
  const avatarSrc = useMemo(() => {
    const charCode = seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1);
    if (charCode % 3 === 0) return solanaAvatar;
    if (charCode % 3 === 1) return fireAvatar;
    return voidAvatar;
  }, [seed]);

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center select-none pointer-events-none",
        className
      )}
    >
      {/* Main Avatar Image - Sitting Pose */}
      <img 
        src={avatarSrc} 
        alt={`King Avatar ${seed}`}
        className={cn(
          "w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]",
          glow && "filter drop-shadow-[0_0_20px_rgba(20,241,149,0.4)]"
        )}
      />
      
      {/* Glitch/Hologram Overlay Effect */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-t from-primary/20 to-transparent"
        style={{
          maskImage: `url(${avatarSrc})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: `url(${avatarSrc})`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center'
        }}
      />
    </div>
  );
}
