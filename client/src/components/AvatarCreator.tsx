import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { KingAvatar } from "@/components/KingAvatar";
import { useWallet } from "@/context/WalletContext";
import { User, Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to create the cropped image
async function getCroppedImg(imageSrc: string, pixelCrop: any) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => { image.onload = resolve; });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
}

export function AvatarCreator() {
  const { userAvatar, userName, walletAddress, updateIdentity, isConnected } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState(userName || "");
  
  // Image Crop State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  // Preview State (if they already have one uploaded or just cropped)
  const [previewImage, setPreviewImage] = useState<string | null>(
    userAvatar && userAvatar.startsWith("blob:") ? userAvatar : null
  );

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setPreviewImage(null); // Switch to cropping mode
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    let finalAvatar = userAvatar || walletAddress || "default";
    
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        finalAvatar = croppedImage;
        setPreviewImage(croppedImage);
      }
    } else if (previewImage) {
       finalAvatar = previewImage;
    }

    updateIdentity(name, finalAvatar);
    setIsOpen(false);
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    // Revert to current avatar if exists
    if (userAvatar && userAvatar.startsWith("blob:")) {
      setPreviewImage(userAvatar);
    }
  };

  if (!isConnected) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black uppercase tracking-wider font-mono text-xs">
          <User className="w-4 h-4 mr-2" />
          Edit Identity
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/95 border-primary/20 text-white backdrop-blur-xl sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold uppercase tracking-widest text-center mb-4">
            Forging Chamber
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6">
          
          {/* IMAGE AREA */}
          <div className="w-full aspect-square bg-black rounded-lg border border-white/10 overflow-hidden relative group">
            {imageSrc ? (
              // CROPPING MODE
              <div className="relative w-full h-full">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  classes={{ containerClassName: "bg-black" }}
                />
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="absolute top-2 right-2 z-10 rounded-full"
                  onClick={handleCancelCrop}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : previewImage ? (
               // PREVIEW OF UPLOADED IMAGE
               <div className="relative w-full h-full flex items-center justify-center">
                 <img src={previewImage} alt="Avatar Preview" className="w-full h-full object-cover" />
                 <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex flex-col items-center text-white">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-xs uppercase tracking-widest">Change Photo</span>
                    </div>
                    <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                 </label>
               </div>
            ) : (
              // DEFAULT STATE (King Avatar generated from seed)
              <div className="relative w-full h-full flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                 <KingAvatar seed={walletAddress || "default"} glow className="w-3/4 h-3/4" />
                 
                 <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex flex-col items-center text-white">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-xs uppercase tracking-widest">Upload Photo</span>
                    </div>
                    <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
                 </label>
              </div>
            )}
          </div>

          {/* ZOOM CONTROLS (Only visible when cropping) */}
          {imageSrc && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                <span>Zoom</span>
                <span>{zoom}x</span>
              </div>
              <Slider 
                value={[zoom]} 
                min={1} 
                max={3} 
                step={0.1} 
                onValueChange={(val) => setZoom(val[0])}
                className="w-full"
              />
            </div>
          )}

          {/* FORM FIELDS */}
          <div className="space-y-4">
            
            {/* Name Input */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-gray-400">Display Name</Label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/5 border-white/10 font-sans text-white focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Soul Seed (Read Only) */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                Soul Seed 
                <span className="text-[10px] normal-case text-gray-600">(Linked to Wallet)</span>
              </Label>
              <div className="relative">
                <Input 
                  value={walletAddress || ""} 
                  readOnly
                  className="bg-black/50 border-white/5 font-mono text-xs text-gray-500 pr-10 select-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full bg-primary text-black font-bold hover:bg-primary/90 uppercase tracking-widest shadow-[0_0_15px_rgba(255,69,0,0.4)] transition-all hover:shadow-[0_0_25px_rgba(255,69,0,0.6)] h-12">
            Burn Identity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
