import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface StepCompleteProps {
  onNext?: () => void;
  onBack?: () => void;
}

const checklist = [
  "Account created",
  "Identity verified",
  "Payment method secured",
  "Voice training complete",
  "Platforms connected",
  "Practice demo finished",
];

export const StepComplete: React.FC<StepCompleteProps> = ({ onNext }) => {
  useEffect(() => {
    // Simple confetti animation
    if (typeof window !== "undefined") {
      import("canvas-confetti").then(confetti => {
        confetti.default({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <div className="text-4xl mb-2">🎉</div>
      <div className="font-bold text-2xl text-[#1e3a8a]">You're Ready to Bid!</div>
      <div className="text-slate-700 mb-2">All onboarding steps completed. Welcome to VoiceBid!</div>
      <ul className="text-left w-full max-w-xs mx-auto mb-2">
        {checklist.map(item => (
          <li key={item} className="flex items-center gap-2 text-emerald-700 font-semibold mb-1">
            <span className="text-lg">✔</span> {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
        <Button className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold w-full">Join Auction</Button>
        <Button variant="outline" className="w-full">Set Watchlist</Button>
        <Button variant="outline" className="w-full">Download Guide</Button>
      </div>
      <div className="w-full bg-white rounded-lg p-4 border border-slate-200 mt-4">
        <div className="font-semibold mb-2 text-[#1e3a8a]">Quick Reference</div>
        <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li>Commands: "Place a bid of $X", "Cancel my last bid", "End auction"</li>
          <li>Emergency stop phrase: "Stop bidding now"</li>
          <li>Support: <a href="tel:+18001234567" className="text-blue-700 underline">1-800-123-4567</a></li>
        </ul>
      </div>
    </div>
  );
}; 