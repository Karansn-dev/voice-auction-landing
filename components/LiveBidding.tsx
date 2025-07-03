'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Mic, 
  Clock, 
  Users, 
  TrendingUp, 
  Gavel, 
  Phone,
  Zap,
  Eye,
  DollarSign,
  Timer,
  Volume2,
  Bell
} from "lucide-react"

interface AuctionItem {
  id: string
  title: string
  description: string
  currentBid: number
  startingBid: number
  image: string
  timeLeft: string
  bidders: number
  category: string
  isHot: boolean
  lastBidTime: Date
}

const mockAuctionItems: AuctionItem[] = [
  {
    id: "1",
    title: "Vintage Rolex Submariner",
    description: "Classic 1960s Rolex Submariner in excellent condition",
    currentBid: 12500,
    startingBid: 8000,
    image: "/placeholder.jpg",
    timeLeft: "2:45",
    bidders: 8,
    category: "Watches",
    isHot: true,
    lastBidTime: new Date(Date.now() - 30000)
  },
  {
    id: "2",
    title: "Original Picasso Sketch",
    description: "Rare pencil sketch by Pablo Picasso, circa 1950",
    currentBid: 45000,
    startingBid: 30000,
    image: "/placeholder.jpg",
    timeLeft: "1:23",
    bidders: 12,
    category: "Art",
    isHot: true,
    lastBidTime: new Date(Date.now() - 15000)
  },
  {
    id: "3",
    title: "Antique Persian Rug",
    description: "Hand-woven silk Persian rug, 19th century",
    currentBid: 3200,
    startingBid: 2500,
    image: "/placeholder.jpg",
    timeLeft: "5:12",
    bidders: 5,
    category: "Antiques",
    isHot: false,
    lastBidTime: new Date(Date.now() - 120000)
  }
]

export default function LiveBidding() {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>(mockAuctionItems)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isBidding, setIsBidding] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionItems(prev => prev.map(item => {
        // Randomly update some items with new bids
        if (Math.random() < 0.3 && item.isHot) {
          const bidIncrease = Math.floor(Math.random() * 500) + 100
          const newBid = item.currentBid + bidIncrease
          
          // Add notification
          setNotifications(prev => [...prev, `New bid on ${item.title}: ${formatPrice(newBid)}`])
          
          return {
            ...item,
            currentBid: newBid,
            lastBidTime: new Date(),
            bidders: item.bidders + (Math.random() < 0.5 ? 1 : 0)
          }
        }
        return item
      }))
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Update countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctionItems(prev => prev.map(item => {
        const [minutes, seconds] = item.timeLeft.split(':').map(Number)
        let newSeconds = seconds - 1
        let newMinutes = minutes

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes = Math.max(0, newMinutes - 1)
        }

        return {
          ...item,
          timeLeft: `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`
        }
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Clean up old notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev.slice(-2)) // Keep only last 2 notifications
    }, 5000) // Clean up every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleBid = (itemId: string) => {
    setIsBidding(true)
    // Simulate bid processing
    setTimeout(() => {
      setAuctionItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, currentBid: item.currentBid + 100, lastBidTime: new Date() }
          : item
      ))
      setIsBidding(false)
    }, 1000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const isRecentlyBid = (lastBidTime: Date) => {
    return Date.now() - lastBidTime.getTime() < 10000 // 10 seconds
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Floating Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.slice(-3).map((notification, index) => (
          <div
            key={index}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right max-w-xs"
            style={{
              animation: 'slideInRight 0.5s ease-out',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{notification}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Ticker */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 mb-8 rounded-lg">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center space-x-4 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
              <span>•</span>
              <span>{auctionItems.filter(item => item.isHot).length} Hot Auctions</span>
              <span>•</span>
              <span>{auctionItems.reduce((sum, item) => sum + item.bidders, 0)} Active Bidders</span>
              <span>•</span>
              <span>Last bid: {auctionItems.filter(item => isRecentlyBid(item.lastBidTime)).length > 0 ? 'Just now' : '2 min ago'}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-white" />
              ) : (
                <div className="relative">
                  <Volume2 className="w-4 h-4 text-white/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-4 bg-white/50 rotate-45"></div>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <Badge className="bg-red-600 text-white hover:bg-red-700">
              <Zap className="w-3 h-3 mr-1" />
              LIVE AUCTIONS
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Active Auctions Happening Now
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join the excitement with real-time bidding on exclusive items. 
            Prices update live - don't miss your chance to win!
          </p>
        </div>

        {/* Live Auction Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {auctionItems.map((item) => (
            <Card 
              key={item.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isRecentlyBid(item.lastBidTime) 
                  ? 'ring-2 ring-emerald-500 shadow-lg' 
                  : ''
              } ${item.isHot ? 'border-orange-300 bg-orange-50/50' : ''}`}
            >
              {/* Hot Badge */}
              {item.isHot && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-orange-600 text-white animate-pulse">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    HOT
                  </Badge>
                </div>
              )}

              {/* Recently Bid Flash Effect */}
              {isRecentlyBid(item.lastBidTime) && (
                <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none"></div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 mb-3">
                      {item.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Item Image */}
                <div className="relative aspect-square bg-slate-200 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Current Bid - Flashing Effect */}
                <div className={`text-center p-4 rounded-lg transition-all duration-300 ${
                  isRecentlyBid(item.lastBidTime) 
                    ? 'bg-emerald-100 border-2 border-emerald-300 animate-pulse-glow' 
                    : 'bg-slate-100'
                }`}>
                  <div className="text-sm text-slate-600 mb-1">Current Bid</div>
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isRecentlyBid(item.lastBidTime) ? 'text-emerald-700' : 'text-slate-900'
                  }`}>
                    {formatPrice(item.currentBid)}
                  </div>
                  {isRecentlyBid(item.lastBidTime) && (
                    <div className="text-xs text-emerald-600 mt-1 animate-bounce font-semibold">
                      🔥 Just Updated!
                    </div>
                  )}
                  {isRecentlyBid(item.lastBidTime) && (
                    <div className="text-xs text-emerald-500 mt-1">
                      +$100 from last bid
                    </div>
                  )}
                </div>

                {/* Auction Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="text-slate-600">Time Left:</span>
                    <span className="font-semibold text-red-600">{item.timeLeft}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-600">Bidders:</span>
                    <span className="font-semibold">{item.bidders}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Starting: {formatPrice(item.startingBid)}</span>
                    <span>Current: {formatPrice(item.currentBid)}</span>
                  </div>
                  <Progress 
                    value={((item.currentBid - item.startingBid) / (item.currentBid * 0.5)) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleBid(item.id)}
                    disabled={isBidding}
                  >
                    {isBidding ? (
                      <>
                        <Timer className="w-4 h-4 mr-2 animate-spin" />
                        Bidding...
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Place Bid
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedItem(item.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>

                {/* Voice Bidding CTA */}
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-700 mb-2">
                    <Phone className="w-4 h-4" />
                    <span>Call to bid with voice: 1-800-VOICE-BID</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-xs text-blue-600">
                    <Volume2 className="w-3 h-3" />
                    <span>Voice commands: "I bid $X" or "Place bid $X"</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Bell className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Mic className="w-3 h-3 mr-1" />
                    Voice Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {auctionItems.filter(item => item.isHot).length}
              </div>
              <div className="text-sm text-slate-600">Hot Auctions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {auctionItems.reduce((sum, item) => sum + item.bidders, 0)}
              </div>
              <div className="text-sm text-slate-600">Active Bidders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {formatPrice(auctionItems.reduce((sum, item) => sum + item.currentBid, 0))}
              </div>
              <div className="text-sm text-slate-600">Total Value</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {auctionItems.filter(item => isRecentlyBid(item.lastBidTime)).length}
              </div>
              <div className="text-sm text-slate-600">Recent Bids</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Bidding?</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Join thousands of successful bidders using voice commands. 
              Never miss an auction again with our revolutionary voice technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100">
                <Mic className="w-5 h-5 mr-2" />
                Start Voice Bidding
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600">
                <Gavel className="w-5 h-5 mr-2" />
                View All Auctions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 