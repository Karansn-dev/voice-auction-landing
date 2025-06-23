import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepIntegrationProps {
  onNext: () => void;
  onBack?: () => void;
}

const platforms = [
  { name: "eBay", oauth: true },
  { name: "Sotheby's", oauth: false },
  { name: "Christie's", oauth: false },
  { name: "Other", oauth: false },
];

const categories = [
  "Art", "Watches", "Cars", "Jewelry", "Collectibles", "Real Estate"
];

export const StepIntegration: React.FC<StepIntegrationProps> = ({ onNext, onBack }) => {
  const [connected, setConnected] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [notify, setNotify] = useState(true);
  const [error, setError] = useState("");

  const handleConnect = (platform: string) => {
    setConnected(prev => prev.includes(platform) ? prev : [...prev, platform]);
  };

  const handleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (connected.length === 0) {
      setError("Connect at least one platform.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <div className="font-semibold mb-2">Connect auction platforms</div>
        <div className="flex gap-3 flex-wrap">
          {platforms.map(p => (
            <Button
              key={p.name}
              type="button"
              className={`px-4 py-2 rounded-lg border ${connected.includes(p.name) ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white text-slate-700 border-slate-300'} transition-all`}
              onClick={() => handleConnect(p.name)}
            >
              {p.oauth ? `Connect ${p.name}` : `Add ${p.name}`}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="font-semibold mb-2">Categories of interest</div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`px-3 py-1 rounded-full border text-sm font-semibold ${selectedCategories.includes(cat) ? 'bg-[#3b82f6] text-white border-[#3b82f6]' : 'bg-white text-slate-700 border-slate-300'} transition-all`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="notify" checked={notify} onChange={e => setNotify(e.target.checked)} />
        <label htmlFor="notify" className="text-sm">Enable notifications for new auctions in my categories</label>
      </div>
      {error && <span className="text-xs text-[#ea580c]">{error}</span>}
      <div className="flex flex-row-reverse gap-2 mt-2">
        <Button type="submit" className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Connect Platforms</Button>
        {onBack && <Button type="button" variant="outline" onClick={onBack}>Back</Button>}
      </div>
    </form>
  );
}; 