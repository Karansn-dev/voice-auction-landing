import React from "react";

interface OnboardingProgressProps {
  step: number;
  steps: string[];
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ step, steps }) => {
  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div className="flex items-center w-full justify-between">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300
                ${idx < step ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : ''}
                ${idx === step ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white shadow-lg' : ''}
                ${idx > step ? 'bg-white border-slate-300 text-slate-400' : ''}
              `}
            >
              {idx < step ? (
                <span className="text-lg font-bold">✓</span>
              ) : (
                <span className="text-base font-bold">{idx + 1}</span>
              )}
            </div>
            <span className={`mt-2 text-xs font-semibold text-center ${idx === step ? 'text-[#1e3a8a]' : 'text-slate-500'}`}>{label}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-1 mt-4 bg-slate-200 rounded-full relative">
        <div
          className="h-1 bg-[#3b82f6] rounded-full transition-all duration-500"
          style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}; 