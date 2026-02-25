"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletContext";
import { Send, Loader2 } from "lucide-react";

export default function TransferForm() {
  const { contract, account, addTransaction } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contract) {
      setMessage("❌ Contract is not connected");
      return;
    }

    if (!recipient || !amount) {
      setMessage("❌ Please fill all fields");
      return;
    }

    if (recipient === account) {
      setMessage("❌ Cannot send to your own address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const tx = await contract.transfer(recipient, ethers.parseEther(amount));
      setMessage(`⏳ Transaction sending... ${tx.hash}`);
      
      await tx.wait();
      setMessage(`✅ Success! ${amount} THW tokens sent`);
      
      // Add to transaction history
      addTransaction({
        to: recipient,
        amount: amount,
        time: new Date().toLocaleTimeString(),
        status: "Success",
        hash: tx.hash
      });
      
      // Clear form
      setRecipient("");
      setAmount("");
    } catch (error: unknown) {
      console.error("Transfer error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setMessage(`❌ Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Send className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Send THW Tokens</h3>
      </div>

      <form onSubmit={handleTransfer} className="space-y-6">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (THW)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            step="0.001"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !contract}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Tokens</span>
            </>
          )}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${
          message.includes("✅") ? "bg-green-50 text-green-800" : 
          message.includes("⏳") ? "bg-blue-50 text-blue-800" : 
          "bg-red-50 text-red-800"
        }`}>
          <p className="text-sm">{message}</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use a valid Ethereum address</li>
          <li>• Transaction requires gas fee</li>
          <li>• Get test ETH from faucet if no ETH in Hardhat network</li>
        </ul>
      </div>
    </div>
  );
}
