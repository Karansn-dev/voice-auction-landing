import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepVoiceProps {
  onNext: () => void;
  onBack?: () => void;
}

const calibrationPhrases = [
  "I am ready to bid.",
  "Place a bid of $100.",
  "Cancel my last bid.",
  "What is the current highest bid?",
];

export const StepVoice: React.FC<StepVoiceProps> = ({ onNext, onBack }) => {
  const [micAllowed, setMicAllowed] = useState(false);
  const [calibrated, setCalibrated] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [error, setError] = useState("");

  const handleMicAccess = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => setMicAllowed(true))
      .catch(() => setError("Microphone access denied. Please allow mic access to continue."));
  };

  const handleCalibrate = () => {
    if (phraseIdx < calibrationPhrases.length - 1) {
      setPhraseIdx(i => i + 1);
    } else {
      setCalibrated(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="font-semibold text-lg">Voice Setup & Training</div>
      {!micAllowed ? (
        <div className="flex flex-col gap-3 items-center">
          <div className="text-slate-700">To use voice bidding, we need access to your microphone.</div>
          <Button type="button" onClick={handleMicAccess} className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Allow Mic Access</Button>
          {error && <span className="text-xs text-[#ea580c]">{error}</span>}
        </div>
      ) : !calibrated ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-slate-700">Read the phrase below clearly to calibrate your voice:</div>
          <div className="bg-[#f1f5f9] rounded-lg px-4 py-3 text-center font-semibold text-[#1e3a8a] text-lg border border-blue-200">{calibrationPhrases[phraseIdx]}</div>
          <Button type="button" onClick={handleCalibrate} className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">I Read It</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-emerald-700 font-semibold">Voice calibration complete!</div>
          <div className="w-full bg-white rounded-lg p-4 border border-slate-200">
            <div className="font-semibold mb-2 text-[#1e3a8a]">Voice Command Reference</div>
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>"Place a bid of $X"</li>
              <li>"Cancel my last bid"</li>
              <li>"What is the current highest bid?"</li>
              <li>"End auction"</li>
            </ul>
          </div>
          <Button type="button" onClick={onNext} className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Complete Voice Training</Button>
        </div>
      )}
      <div className="flex flex-row-reverse gap-2 mt-2">
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </div>
  );
}; 