import { useCallback } from "react";
import { cn } from "../utils/helpers";

export const ConnectButton = () => {
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('@@@ Connected!');
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  }, []);

  if (window.ethereum) {
    return (
      <div
        className={cn(
          "absolute top-4 right-4 px-4 py-2 truncate max-w-40",
        )}
      >
        {window.ethereum.selectedAddress}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "absolute top-4 right-4 px-4 py-2 rounded-lg bg-green-500 text-white",
      )}
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
}

ConnectButton.displayName = "ConnectButton";
