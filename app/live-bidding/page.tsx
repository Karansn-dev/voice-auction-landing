'use client'

import LiveBidding from "@/components/LiveBidding"
import { Button } from "@/components/ui/button"
import { Gavel, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LiveBiddingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">VoiceBid</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="outline" className="text-slate-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Live Bidding Section */}
      <LiveBidding />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Gavel className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">VoiceBid</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2024 VoiceBid. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 