import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepIdentityProps {
  onNext: () => void;
  onBack?: () => void;
}

export const StepIdentity: React.FC<StepIdentityProps> = ({ onNext, onBack }) => {
  const [method, setMethod] = useState("sms");
  const [biometric, setBiometric] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) {
      setError("Please select a verification method.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <div className="font-semibold mb-2">Choose verification method</div>
        <div className="flex gap-4">
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'sms' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="sms" checked={method === 'sms'} onChange={() => setMethod('sms')} className="hidden" />
            SMS
          </label>
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'email' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="email" checked={method === 'email'} onChange={() => setMethod('email')} className="hidden" />
            Email
          </label>
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'id' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="id" checked={method === 'id'} onChange={() => setMethod('id')} className="hidden" />
            ID Upload
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="biometric" checked={biometric} onChange={e => setBiometric(e.target.checked)} />
        <label htmlFor="biometric" className="text-sm">Enable biometric authentication (optional)</label>
      </div>
      {error && <span className="text-xs text-[#ea580c]">{error}</span>}
      <div className="flex flex-row-reverse gap-2 mt-2">
        <Button type="submit" className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Verify & Continue</Button>
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </form>
  );
}; 