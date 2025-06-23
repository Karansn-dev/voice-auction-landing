import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StepAccountProps {
  onNext: () => void;
  onBack?: () => void;
}

const passwordStrength = (pw: string) => {
  if (pw.length < 6) return 0;
  let score = 0;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

export const StepAccount: React.FC<StepAccountProps> = ({ onNext }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "+1",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name) e.name = "Full name is required.";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.phone) e.phone = "Phone is required.";
    if (!form.password) e.password = "Password required.";
    if (form.password && passwordStrength(form.password) < 3) e.password = "Password is too weak.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    if (!form.terms) e.terms = "You must accept the terms.";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) onNext();
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ["bg-slate-200", "bg-orange-400", "bg-yellow-400", "bg-blue-400", "bg-emerald-500"];
  const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="font-semibold">Full Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="bg-[#f1f5f9]" />
        {touched.name && errors.name && <span className="text-xs text-[#ea580c]">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-semibold">Email</Label>
        <Input id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" type="email" className="bg-[#f1f5f9]" />
        {touched.email && errors.email && <span className="text-xs text-[#ea580c]">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="font-semibold">Phone</Label>
        <div className="flex gap-2">
          <select name="country" value={form.country} onChange={handleChange} className="rounded-md border border-slate-300 bg-[#f1f5f9] px-2">
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+61">🇦🇺 +61</option>
          </select>
          <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="123 456 7890" className="bg-[#f1f5f9] flex-1" />
        </div>
        {touched.phone && errors.phone && <span className="text-xs text-[#ea580c]">{errors.phone}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-semibold">Password</Label>
        <Input id="password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Create a password" className="bg-[#f1f5f9]" />
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-2 w-24 rounded-full ${strengthColors[strength]}`}></div>
          <span className={`text-xs font-semibold ${strength === 4 ? 'text-emerald-600' : 'text-slate-500'}`}>{strengthLabels[strength]}</span>
        </div>
        {touched.password && errors.password && <span className="text-xs text-[#ea580c]">{errors.password}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm" className="font-semibold">Confirm Password</Label>
        <Input id="confirm" name="confirm" value={form.confirm} onChange={handleChange} type="password" placeholder="Repeat password" className="bg-[#f1f5f9]" />
        {touched.confirm && errors.confirm && <span className="text-xs text-[#ea580c]">{errors.confirm}</span>}
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms" name="terms" checked={form.terms} onCheckedChange={v => handleChange({ target: { name: 'terms', type: 'checkbox', checked: !!v } } as any)} />
        <Label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="underline text-blue-700">Terms</a> & <a href="#" className="underline text-blue-700">Privacy Policy</a></Label>
        {touched.terms && errors.terms && <span className="text-xs text-[#ea580c] ml-2">{errors.terms}</span>}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
        <a href="/signin" className="text-sm text-blue-700 underline">Already have an account? Sign In</a>
        <Button type="submit" className="bg-[#1e3a8a] hover:bg-[#0f172a] text-white font-bold px-6 py-2 rounded-lg transition-all">Create Account & Continue</Button>
      </div>
    </form>
  );
}; 