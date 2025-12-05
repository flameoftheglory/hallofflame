import { cn } from "@/lib/utils";
import lavaBg from "@assets/generated_images/dark_digital_lava_background_for_website.png";

interface FlameBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "high";
}

export function FlameBackground({ children, className, intensity = "low" }: FlameBackgroundProps) {
  return (
    <div className={cn("min-h-screen w-full relative overflow-hidden bg-black text-white", className)}>
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${lavaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: intensity === "high" ? 'contrast(1.2) brightness(0.8)' : 'contrast(1.1) brightness(0.6)'
        }}
      />
      
      {/* Overlay Gradient for Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%]" />

      {/* Ember Particles (CSS Animation) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full animate-pulse opacity-20 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
