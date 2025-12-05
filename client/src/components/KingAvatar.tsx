import { useMemo } from "react";
import { cn } from "@/lib/utils";
import soldierAvatar from "@assets/generated_images/cyberpunk_soldier_sitting_on_black.png";
import demonAvatar from "@assets/generated_images/magma_demon_sitting_on_black.png";
import spiritAvatar from "@assets/generated_images/ethereal_entity_sitting_on_black.png";

interface KingAvatarProps {
  seed: string;
  className?: string;
  glow?: boolean;
}

export function KingAvatar({ seed, className, glow = false }: KingAvatarProps) {
  // 1. Select Base Model based on seed
  const { avatarSrc, hueRotate, brightness, saturate } = useMemo(() => {
    // Simple hash function to get deterministic numbers from string
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const modelIndex = Math.abs(hash) % 3;
    
    // Generate a hue rotation (0-360) to create "infinite" variations
    // We use a large prime multiplier to scatter the colors for similar seeds
    const hue = Math.abs(hash * 137) % 360;
    
    // Subtle variations in brightness and saturation
    const bri = 100 + (Math.abs(hash * 31) % 30); // 100-130%
    const sat = 100 + (Math.abs(hash * 17) % 50); // 100-150%

    let src = soldierAvatar;
    if (modelIndex === 1) src = demonAvatar;
    if (modelIndex === 2) src = spiritAvatar;

    return { 
      avatarSrc: src, 
      hueRotate: hue,
      brightness: bri,
      saturate: sat
    };
  }, [seed]);

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center select-none pointer-events-none",
        className
      )}
    >
      {/* 
         CRITICAL FIX: mix-blend-mode: screen 
         This makes the black background of the generated image transparent, 
         showing only the glowing avatar details.
      */}
      <img 
        src={avatarSrc} 
        alt={`King Avatar ${seed}`}
        className={cn(
          "w-full h-auto object-contain mix-blend-screen", // Removes black background
          glow && "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        )}
        style={{
          filter: `hue-rotate(${hueRotate}deg) brightness(${brightness}%) saturate(${saturate}%)`
        }}
      />
      
      {/* Optional inner glow for extra "spirit" effect */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-50 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
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
