"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateEmi(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100;

  if (principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }

  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

/** Simple two-segment SVG donut — principal vs. interest, no chart library needed. */
function BreakdownDonut({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) {
  const total = principal + interest || 1;
  const principalRatio = principal / total;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const principalLength = circumference * principalRatio;

  return (
    <svg viewBox="0 0 160 160" className="h-40 w-40">
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke="#9de6c8"
        strokeWidth="18"
      />
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke="#013f4a"
        strokeWidth="18"
        strokeDasharray={`${principalLength} ${circumference - principalLength}`}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />
      <text
        x="80"
        y="76"
        textAnchor="middle"
        className="fill-deep-900 font-display text-sm font-bold"
      >
        {Math.round(principalRatio * 100)}%
      </text>
      <text x="80" y="94" textAnchor="middle" className="fill-deep-400 text-[10px]">
        Principal
      </text>
    </svg>
  );
}

export function EmiCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(10.5);
  const [tenureYears, setTenureYears] = useState(5);

  const tenureMonths = tenureYears * 12;

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calculateEmi(amount, rate, tenureMonths),
    [amount, rate, tenureMonths],
  );

  return (
    <Card className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="amount" className="text-sm font-semibold text-deep-800">
              Loan Amount
            </label>
            <span className="font-display text-sm font-bold text-deep-900">
              {formatCurrency(amount)}
            </span>
          </div>
          <input
            id="amount"
            type="range"
            min={50000}
            max={20000000}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="rate" className="text-sm font-semibold text-deep-800">
              Interest Rate (p.a.)
            </label>
            <span className="font-display text-sm font-bold text-deep-900">
              {rate.toFixed(1)}%
            </span>
          </div>
          <input
            id="rate"
            type="range"
            min={5}
            max={24}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="tenure" className="text-sm font-semibold text-deep-800">
              Tenure
            </label>
            <span className="font-display text-sm font-bold text-deep-900">
              {tenureYears} {tenureYears === 1 ? "year" : "years"}
            </span>
          </div>
          <input
            id="tenure"
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-primary-500"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-mint p-8 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-deep-400">
            Monthly EMI
          </p>
          <p className="font-display text-3xl font-bold text-deep-900">
            {formatCurrency(emi)}
          </p>
        </div>

        <BreakdownDonut principal={amount} interest={totalInterest} />

        <div className="grid w-full grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-deep-400">
              Total Interest
            </p>
            <p className="font-display text-lg font-bold text-deep-900">
              {formatCurrency(totalInterest)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-deep-400">
              Total Payment
            </p>
            <p className="font-display text-lg font-bold text-deep-900">
              {formatCurrency(totalPayment)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
