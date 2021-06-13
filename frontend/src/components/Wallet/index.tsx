import React, { useContext } from "react";
import Web3Context from "../../context/web3";

export function ConnectWallet() {
  const { wallet, address, readyToTransact } = useContext(Web3Context);

  const handleClick = () => (!wallet.provider ? readyToTransact() : null);

  const walletText = (wallet?.provider && address)
    ? address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4)
    : "Connect to a Wallet"

  return (
    <button
      className="rounded px-3 py-2 border-b-4 border-l-2 focus:outline-none shadow-lg bg-gray-500 border-gray-600 font-mono text-white"
      type="button"
      onClick={handleClick}
    >
      {walletText}
    </button>
  );
}