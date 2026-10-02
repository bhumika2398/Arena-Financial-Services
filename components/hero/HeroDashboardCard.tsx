"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, IndianRupee, TrendingUp } from "lucide-react";

/**
 * The Hero's centerpiece floating card — a mock loan-application status
 * mockup, larger and more detailed than the small stat pills in
 * HeroAnimation. Dark glassmorphism with a glowing teal border, positioned
 * below the headline/CTA row.
 */
export function HeroDashboardCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.95 }}
      className="relative mx-auto mt-4 w-full max-w-xl"
    >
      <div
        className={
          "absolute -inset-1 rounded-3xl bg-[radial-gradient(closest-side,rgba(6,133,98,0.45),transparent)] blur-2xl " +
          (prefersReducedMotion ? "opacity-70" : "animate-pulse-glow")
        }
      />
      <div className="relative rounded-2xl border border-primary-400/40 bg-white/8 p-5 text-left shadow-[0_8px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm sm:p-6 sm:backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-deep-200">
              Loan Application
            </p>
            <p className="font-display text-sm font-bold text-white sm:text-base">
              #AFS-2024-8821
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/15 px-3 py-1 text-xs font-semibold text-primary-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approved
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-sage-400 to-primary-400"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-sage-300" />
            <div>
              <p className="text-[11px] text-deep-200">Amount</p>
              <p className="text-sm font-semibold text-white">₹12,50,000</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-sage-300" />
            <div>
              <p className="text-[11px] text-deep-200">Interest Rate</p>
              <p className="text-sm font-semibold text-white">10.5% p.a.</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2 sm:col-span-1">
            <CheckCircle2 className="h-4 w-4 text-sage-300" />
            <div>
              <p className="text-[11px] text-deep-200">Disbursal</p>
              <p className="text-sm font-semibold text-white">24 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
