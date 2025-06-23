"use client";
import { useState } from "react";
import { OnboardingProgress } from "@/components/onboarding/Progress";
import { StepAccount } from "@/components/onboarding/StepAccount";
import { StepIdentity } from "@/components/onboarding/StepIdentity";
import { StepPayment } from "@/components/onboarding/StepPayment";
import { StepVoice } from "@/components/onboarding/StepVoice";
import { StepIntegration } from "@/components/onboarding/StepIntegration";
import { StepPractice } from "@/components/onboarding/StepPractice";
import { StepComplete } from "@/components/onboarding/StepComplete";

const steps = [
  { label: "Account", component: StepAccount },
  { label: "Identity", component: StepIdentity },
  { label: "Payment", component: StepPayment },
  { label: "Voice", component: StepVoice },
  { label: "Integration", component: StepIntegration },
  { label: "Practice", component: StepPractice },
  { label: "Complete", component: StepComplete },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const StepComponent = steps[step].component;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center font-sans" style={{ fontFamily: 'Inter, Poppins, Open Sans, sans-serif' }}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-8">
        <OnboardingProgress step={step} steps={steps.map(s => s.label)} />
        <div className="relative min-h-[340px] flex flex-col justify-between">
          <StepComponent onNext={() => setStep(s => Math.min(s + 1, steps.length - 1))} onBack={() => setStep(s => Math.max(s - 1, 0))} />
        </div>
      </div>
    </div>
  );
} 