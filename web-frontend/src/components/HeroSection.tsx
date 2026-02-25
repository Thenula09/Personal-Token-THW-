"use client";

import { TrendingUp, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to THW Token
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your gateway to decentralized finance with the Thenula Hansaja token ecosystem
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span>Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
}
