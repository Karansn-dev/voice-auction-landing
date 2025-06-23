import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepPracticeProps {
  onNext: () => void;
  onBack?: () => void;
}

export const StepPractice: React.FC<StepPracticeProps> = ({ onNext, onBack }) => {
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [response, setResponse] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleStart = () => {
    setStarted(true);
    // Simulate feedback
    setTimeout(() => {
      setFeedback("Great job! Your voice command was recognized.");
      setScore(98);
      setResponse(1.2);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="font-semibold text-lg">Practice Demo</div>
      {!started ? (
        <>
          <div className="text-slate-700 text-center">Try a simulated auction. Use your voice to place a bid and see real-time feedback.</div>
          <Button type="button" onClick={handleStart} className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Start Practice Demo</Button>
        </>
      ) : (
        <div className="w-full flex flex-col gap-4 items-center">
          <div className="w-full bg-[#f1f5f9] rounded-lg p-4 border border-blue-200 text-center">
            <div className="font-semibold mb-2 text-[#1e3a8a]">Simulated Auction</div>
            <div className="text-slate-700 mb-2">Say: <span className="font-bold text-[#1e3a8a]">"Place a bid of $500"</span></div>
            {feedback && <div className="text-emerald-700 font-semibold mt-2">{feedback}</div>}
          </div>
          {score !== null && (
            <div className="flex gap-4 mt-2">
              <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">Voice Accuracy: {score}%</div>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">Response: {response}s</div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${success ? 'bg-emerald-500 text-white' : 'bg-orange-400 text-white'}`}>{success ? 'Success' : 'Try Again'}</div>
            </div>
          )}
          <Button type="button" onClick={onNext} className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all mt-4">Continue</Button>
        </div>
      )}
      <div className="flex flex-row-reverse gap-2 mt-2 w-full">
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </div>
  );
}; 