"use client";

import { Users, Globe, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About THW Token
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building the future of decentralized finance with innovative blockchain solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Community Driven
            </h3>
            <p className="text-gray-600">
              Join thousands of users in the THW ecosystem and grow together
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Global Access
            </h3>
            <p className="text-gray-600">
              Send and receive THW tokens instantly anywhere in the world
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Secure &amp; Reliable
            </h3>
            <p className="text-gray-600">
              Built on blockchain technology with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
