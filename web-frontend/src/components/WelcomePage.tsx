"use client";

import { useWallet } from "@/context/WalletContext";
import { TrendingUp, Wallet, ArrowRight, Sparkles, BarChart3, Users, Globe } from "lucide-react";

interface WelcomePageProps {
  onEnterDashboard: () => void;
}

export default function WelcomePage({ onEnterDashboard }: WelcomePageProps) {
  const { connectWallet, isConnected } = useWallet();
  const chartData = [
    { day: "Mon", value: 100 },
    { day: "Tue", value: 150 },
    { day: "Wed", value: 120 },
    { day: "Thu", value: 180 },
    { day: "Fri", value: 220 },
    { day: "Sat", value: 280 },
    { day: "Sun", value: 350 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse bottom-10 right-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Thenula Hansaja</h1>
                <p className="text-sm text-gray-300">Company Private Limited</p>
              </div>
            </div>
            
            <button
              onClick={onEnterDashboard}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white">My Personal Token</h2>
          </div>
          <p className="text-xl text-gray-300 mb-8">
            THW Token - Your Gateway to Digital Finance
          </p>
          
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              <Wallet className="w-6 h-6" />
              <span>Connect Wallet to Get Started</span>
            </button>
          ) : (
            <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-2xl">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span>Wallet Connected</span>
            </div>
          )}
        </div>

        {/* Token Growth Chart */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">THW Token Growth</h3>
            <div className="flex items-center space-x-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+250% This Week</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative">
                  <div
                    className="bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                    style={{
                      height: `${(data.value / maxValue) * 100}%`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold opacity-0 hover:opacity-100 transition-opacity">
                    {data.value}
                  </div>
                </div>
                <span className="text-gray-300 text-sm mt-2">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Real-time Analytics</h4>
            <p className="text-gray-300">Track your THW token performance with live charts and detailed analytics.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Community Driven</h4>
            <p className="text-gray-300">Join thousands of users in the THW ecosystem and grow together.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Global Access</h4>
            <p className="text-gray-300">Send and receive THW tokens instantly anywhere in the world.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={onEnterDashboard}
            className="inline-flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-gray-300 mt-4">Manage your THW tokens like a professional</p>
        </div>
      </main>
    </div>
  );
}
