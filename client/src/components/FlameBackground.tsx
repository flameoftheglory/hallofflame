import { cn } from "@/lib/utils";
import lavaBg from "@assets/generated_images/dark_digital_lava_background_for_website.png";
import lavaVideo from "@assets/lava_background.mp4";

interface FlameBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "high";
  videoEnabled?: boolean;
}

export function FlameBackground({ 
  children, 
  className, 
  intensity = "low",
  videoEnabled = true 
}: FlameBackgroundProps) {
  return (
    <div className={cn("min-h-screen w-full relative overflow-hidden bg-black text-white", className)}>
      {/* Background Layer */}
      {videoEnabled ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 z-0 w-full h-full object-cover opacity-60 pointer-events-none"
          style={{
            filter: intensity === "high" ? 'contrast(1.2) brightness(0.7)' : 'contrast(1.1) brightness(0.5) blur(4px)'
          }}
        >
          <source src={lavaVideo} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="fixed inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${lavaBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: intensity === "high" ? 'contrast(1.2) brightness(0.8)' : 'contrast(1.1) brightness(0.6)'
          }}
        />
      )}
      
      {/* Overlay Gradient for Vignette & Depth */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/80" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%]" />

      {/* Scanline Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5" 
        style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)', backgroundSize: '100% 4px' }} 
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
