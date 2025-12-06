import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  userName: string | null;
  userAvatar: string | null; // Can be a seed string OR a data URL/Blob URL
  connectWallet: (walletType: string) => void;
  disconnectWallet: () => void;
  updateIdentity: (name: string, avatar: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    const savedAddress = localStorage.getItem("mock_wallet_address");
    const savedName = localStorage.getItem("mock_user_name");
    const savedAvatar = localStorage.getItem("mock_user_avatar");
    
    if (savedAddress) {
      setIsConnected(true);
      setWalletAddress(savedAddress);
      setUserName(savedName || "Anon");
      setUserAvatar(savedAvatar || savedAddress);
    }
  }, []);

  const connectWallet = (walletType: string) => {
    // Simulate connection process
    toast({
      title: "Connecting to Wallet...",
      description: `Requesting connection to ${walletType}...`,
    });

    setTimeout(() => {
      // Mock address generation
      const mockAddress = "8xXt...3kLm";
      
      setIsConnected(true);
      setWalletAddress(mockAddress);
      
      // If no identity exists, set defaults
      if (!userName) setUserName("Anon");
      if (!userAvatar) setUserAvatar(mockAddress);
      
      localStorage.setItem("mock_wallet_address", mockAddress);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType}`,
      });
    }, 1500);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setUserName(null);
    setUserAvatar(null);
    localStorage.removeItem("mock_wallet_address");
    localStorage.removeItem("mock_user_name");
    localStorage.removeItem("mock_user_avatar");
    
    toast({
      title: "Wallet Disconnected",
    });
  };

  const updateIdentity = (name: string, avatar: string) => {
    setUserName(name);
    setUserAvatar(avatar);
    localStorage.setItem("mock_user_name", name);
    localStorage.setItem("mock_user_avatar", avatar);
    
    toast({
      title: "Identity Updated",
      description: "Your visual identity has been burned onto the chain.",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        userName,
        userAvatar,
        connectWallet,
        disconnectWallet,
        updateIdentity,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
