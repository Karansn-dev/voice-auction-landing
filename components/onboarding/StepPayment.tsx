import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepPaymentProps {
  onNext: () => void;
  onBack?: () => void;
}

export const StepPayment: React.FC<StepPaymentProps> = ({ onNext, onBack }) => {
  const [method, setMethod] = useState("card");
  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) {
      setError("Please select a payment method.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <div className="font-semibold mb-2">Choose payment method</div>
        <div className="flex gap-4 flex-wrap">
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'card' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="hidden" />
            Card
          </label>
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'bank' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="bank" checked={method === 'bank'} onChange={() => setMethod('bank')} className="hidden" />
            Bank
          </label>
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'paypal' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} className="hidden" />
            PayPal
          </label>
          <label className={`px-4 py-2 rounded-lg border cursor-pointer ${method === 'apple' ? 'border-[#1e3a8a] bg-blue-50' : 'border-slate-300'}`}>
            <input type="radio" name="method" value="apple" checked={method === 'apple'} onChange={() => setMethod('apple')} className="hidden" />
            Apple Pay
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="limit" className="font-semibold">Set bidding limit (optional)</label>
        <input id="limit" name="limit" value={limit} onChange={e => setLimit(e.target.value)} placeholder="e.g. $500/day" className="rounded-md border border-slate-300 bg-[#f1f5f9] px-2 py-2" />
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">SSL Secured</span>
        <span>We don't store card details</span>
      </div>
      {error && <span className="text-xs text-[#ea580c]">{error}</span>}
      <div className="flex flex-row-reverse gap-2 mt-2">
        <Button type="submit" className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Secure Payment Method</Button>
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </form>
  );
}; 