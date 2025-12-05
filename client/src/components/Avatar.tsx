import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  seed: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

export function Avatar({ seed, size = 48, className, glow = false }: AvatarProps) {
  const avatarUrl = useMemo(() => {
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  }, [seed]);

  return (
    <div 
      className={cn(
        "rounded-full overflow-hidden border-2 border-white/10 bg-black/50 relative",
        glow && "shadow-[0_0_15px_rgba(255,69,0,0.6)] border-primary",
        className
      )}
      style={{ width: size, height: size }}
    >
      <img 
        src={avatarUrl} 
        alt={`Avatar for ${seed}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
