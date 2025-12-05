import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KingAvatar } from "@/components/KingAvatar";
import { useWallet } from "@/context/WalletContext";
import { User, Sparkles } from "lucide-react";

export function AvatarCreator() {
  const { userAvatar, updateAvatar, isConnected } = useWallet();
  const [seed, setSeed] = useState(userAvatar || "visual_key");
  const [isOpen, setIsOpen] = useState(false);

  if (!isConnected) return null;

  const handleSave = () => {
    updateAvatar(seed);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black uppercase tracking-wider font-mono text-xs">
          <User className="w-4 h-4 mr-2" />
          Edit Identity
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-primary/20 text-white backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold uppercase tracking-widest text-center">
            Forging Chamber
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-8 py-6">
          {/* Preview */}
          <div className="relative group w-48 h-48 flex items-center justify-center bg-white/5 rounded-lg overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 animate-pulse" />
            <KingAvatar seed={seed} glow className="w-40" />
          </div>

          {/* Controls */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-gray-400">Soul Seed</Label>
              <div className="flex gap-2">
                <Input 
                  value={seed} 
                  onChange={(e) => setSeed(e.target.value)}
                  className="bg-white/5 border-white/10 font-mono text-center text-white"
                />
                <Button 
                  size="icon" 
                  variant="secondary" 
                  onClick={() => setSeed(Math.random().toString(36).substring(7))}
                  className="shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-gray-500 text-center pt-2">
                Your avatar form changes based on your unique soul seed.
              </p>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-primary text-black font-bold hover:bg-primary/90 uppercase tracking-widest">
            Burn Identity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
