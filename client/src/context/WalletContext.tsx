import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  userAvatar: string | null;
  updateAvatar: (seed: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const { toast } = useToast();

  const connectWallet = () => {
    // Mock connection delay
    setTimeout(() => {
      const mockAddress = "8xXt...3kLm";
      setIsConnected(true);
      setWalletAddress(mockAddress);
      setUserAvatar(mockAddress); // Default avatar seed is address
      toast({
        title: "Wallet Connected",
        description: `Connected to ${mockAddress}`,
      });
    }, 1000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setUserAvatar(null);
    toast({
      title: "Wallet Disconnected",
    });
  };

  const updateAvatar = (seed: string) => {
    setUserAvatar(seed);
    toast({
      title: "Avatar Updated",
      description: "Your visual identity has been burned onto the chain (mock).",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
        userAvatar,
        updateAvatar,
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
