'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mic,
  Zap,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Gavel,
  Headphones,
  Globe,
  Star,
  Play,
  X,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

// Custom hook for scroll-triggered animation
function useSlideIn(direction = "up", threshold = 0.15): [React.RefObject<HTMLElement | null>, string] {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  let base = "opacity-0 translate-y-8"
  if (direction === "left") base = "opacity-0 -translate-x-8"
  if (direction === "right") base = "opacity-0 translate-x-8"
  if (direction === "up") base = "opacity-0 translate-y-8"
  if (direction === "down") base = "opacity-0 -translate-y-8"

  return [
    ref,
    visible
      ? "opacity-100 translate-x-0 translate-y-0 transition-all duration-700 ease-out"
      : `${base} transition-all duration-700 ease-out`,
  ]
}

export default function VoiceAuctionLanding() {
  // For each section, use the hook with a different direction
  const [featuresRef, featuresAnim] = useSlideIn("left")
  const [howItWorksRef, howItWorksAnim] = useSlideIn("right")
  const [benefitsRef, benefitsAnim] = useSlideIn("up")
  const [demoRef, demoAnim] = useSlideIn("left")

  // Add smooth scroll behavior globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <Gavel className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">VoiceBid</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-900 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 active:bg-blue-50 active:text-blue-900">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-900 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 active:bg-blue-50 active:text-blue-900">
                How It Works
              </a>
              <a href="#benefits" className="text-slate-600 hover:text-blue-900 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 active:bg-blue-50 active:text-blue-900">
                Benefits
              </a>
              <a href="#demo" className="text-slate-600 hover:text-blue-900 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 active:bg-blue-50 active:text-blue-900">
                Demo
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <button
                  className="px-4 py-2 text-sm font-bold text-slate-800 bg-white rounded-lg border border-transparent hover:border-blue-300 focus:border-violet-400 active:bg-blue-50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ boxShadow: 'none' }}
                >
                  Sign In
                </button>
              </Link>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">Start Bidding</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Revolutionary Voice Technology</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Never Miss an Auction Again -<span className="text-emerald-400"> Bid with Your Voice</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Revolutionary voice agent that lets you participate in real-time auctions through simple phone calls.
                  Fast, secure, and always available.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                    Start Bidding Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">10K+</div>
                  <div className="text-sm text-slate-400">Active Bidders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">95%</div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{"<2s"}</div>
                  <div className="text-sm text-slate-400">Response Time</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 font-medium">Live Auction Active</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">Vintage Watch Collection</span>
                        <span className="text-orange-400 font-bold">$2,450</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mic className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-400">{"Voice: 'I bid $2,500'"}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-900/30 border border-emerald-500 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Bid Placed Successfully!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section ref={featuresRef as React.RefObject<HTMLElement>} className={`py-20 bg-slate-50 ${featuresAnim}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">The Auction Speed Challenge</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Traditional online bidding can't keep up with the lightning-fast pace of modern auctions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Lightning Speed Required</h3>
                <p className="text-slate-600">
                  Auctions move at breakneck speed - bids change every second, leaving slow interfaces behind
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <X className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Missed Opportunities</h3>
                <p className="text-slate-600">
                  Users lose winning bids due to slow typing, interface delays, and screen limitations
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Constant Attention Required</h3>
                <p className="text-slate-600">
                  Traditional bidding demands constant screen monitoring and rapid manual input
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section ref={howItWorksRef as React.RefObject<HTMLElement>} id="features" className={`py-20 bg-white ${howItWorksAnim}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Voice-Powered Auction Participation</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Revolutionary technology that transforms how you participate in auctions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Voice Commands</h3>
                <p className="text-slate-600">Place bids using natural speech - just say "I bid $500" and you're in</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-Time Updates</h3>
                <p className="text-slate-600">
                  Get instant auction status and bid changes delivered directly to your ear
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phone Integration</h3>
                <p className="text-slate-600">
                  Bid from anywhere with just a phone call - no apps or internet required
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Processing</h3>
                <p className="text-slate-600">
                  Authenticated and validated bid placement with enterprise-grade security
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Time Management</h3>
                <p className="text-slate-600">Never miss auction deadlines with intelligent timing and alerts</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Platform</h3>
                <p className="text-slate-600">Works with major auction platforms and supports multiple languages</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={benefitsRef as React.RefObject<HTMLElement>} id="how-it-works" className={`py-20 bg-slate-50 ${benefitsAnim}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get started in minutes and start winning auctions with your voice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Call & Authenticate</h3>
              <p className="text-slate-600">Dial our secure number and verify your identity with voice recognition</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Browse Auctions</h3>
              <p className="text-slate-600">Hear available items, current bids, and auction status in real-time</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Place Bids</h3>
              <p className="text-slate-600">Simply say "I bid $X" to participate instantly in any auction</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Win & Celebrate</h3>
              <p className="text-slate-600">Get instant confirmation of successful bids and winning notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Why Choose Voice Bidding?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Faster than typing or clicking</h3>
                    <p className="text-slate-600">Voice commands are processed in under 2 seconds</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Works with any phone connection</h3>
                    <p className="text-slate-600">No internet required - works on any phone, anywhere</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Hands-free operation</h3>
                    <p className="text-slate-600">Bid while driving, walking, or multitasking</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Real-time auction monitoring</h3>
                    <p className="text-slate-600">Stay updated on all bid changes and auction status</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Secure and authenticated</h3>
                    <p className="text-slate-600">Bank-level security with voice biometric verification</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Never miss a bid opportunity</h3>
                    <p className="text-slate-600">Intelligent alerts and automated bid management</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Success Stories</h3>
                <p className="text-slate-600">Join thousands of successful bidders</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-3">
                    "I won 3 auctions last week while commuting to work. The voice system is incredibly fast and
                    reliable."
                  </p>
                  <div className="text-sm text-slate-500">- Sarah M., Art Collector</div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-3">
                    "Game changer for busy professionals. I can bid on rare items without being glued to my screen."
                  </p>
                  <div className="text-sm text-slate-500">- Michael R., Business Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section ref={demoRef as React.RefObject<HTMLElement>} id="demo" className={`py-20 bg-slate-900 text-white ${demoAnim}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the power of voice bidding with our interactive demo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8 mb-8">
              <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                  <p className="text-slate-400">Watch how voice bidding works in real-time</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-700 rounded-lg p-4">
                  <Headphones className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Listen to live auctions</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <Mic className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Speak your bids naturally</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm text-slate-300">Get instant confirmation</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg mr-4">
                Try Live Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
              >
                Schedule Demo Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Auction Experience?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful bidders who never miss an opportunity
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-slate-100 px-8 py-4 text-lg">
              Start Bidding Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
            >
              Contact Sales
            </Button>
          </div>

          <p className="text-sm text-blue-200">No setup fees • 30-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">VoiceBid</span>
              </div>
              <p className="text-slate-400 mb-4">Revolutionary voice-powered auction participation system.</p>
              <div className="text-sm text-slate-500">© 2024 VoiceBid. All rights reserved.</div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">Built with cutting-edge voice AI technology</div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
