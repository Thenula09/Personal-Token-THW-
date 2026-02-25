"use client";

import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Wallet, Wallet2, TrendingUp, Send, ArrowRight } from "lucide-react";
import TransferForm from "@/components/TransferForm";
import WelcomePage from "@/components/WelcomePage";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { 
    account, 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    balance, 
    tokenName, 
    tokenSymbol,
    transactions
  } = useWallet();

  // Show welcome page first
  if (showWelcome) {
    return <WelcomePage onEnterDashboard={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">THW Token</h1>
            </div>
            
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-600">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          /* Welcome Section */
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet2 className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to THW Token Dashboard
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Industrial level token management system for Thenula Token (THW). 
              Connect your wallet to get started.
            </p>
            <button
              onClick={connectWallet}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Your Wallet</span>
            </button>
          </div>
        ) : (
          /* Dashboard Section */
          <div className="space-y-8">
            {/* Token Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Token Information</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Token Name</p>
                  <p className="text-xl font-semibold text-gray-900">{tokenName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Token Symbol</p>
                  <p className="text-xl font-semibold text-gray-900">{tokenSymbol}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Your Balance</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {parseFloat(balance).toLocaleString()} {tokenSymbol}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Send Tokens</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Transfer THW tokens to any wallet address
                </p>
                <button className="flex items-center space-x-2 text-green-600 font-medium hover:text-green-700">
                  <span>Send Tokens</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Wallet2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Wallet Details</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  View your wallet address and transaction history
                </p>
                <button className="flex items-center space-x-2 text-purple-600 font-medium hover:text-purple-700">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transfer Form */}
            <TransferForm />

            {/* Transaction History */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-gray-400 text-sm uppercase">
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr><td colSpan={4} className="py-6 text-center text-gray-500">No transactions yet.</td></tr>
                    ) : (
                      transactions.map((tx, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition">
                          <td className="py-3 px-4 font-medium text-green-600">SENT</td>
                          <td className="py-3 px-4 text-gray-600 font-mono text-xs">{tx.to}</td>
                          <td className="py-3 px-4 font-bold">{tx.amount} THW</td>
                          <td className="py-3 px-4 text-gray-500 text-sm">{tx.time}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Wallet Address:</span>
                  <span className="font-mono text-sm">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="text-sm">Local Hardhat Network</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
