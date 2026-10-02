import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[0.01em] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-primary-400 to-primary-500 text-deep-900 shadow-[0_6px_16px_-4px_rgba(6,133,98,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] hover:brightness-110 hover:shadow-[0_10px_22px_-4px_rgba(6,133,98,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] active:brightness-95",
        secondary:
          "bg-deep-900 text-white shadow-[0_6px_14px_-4px_rgba(1,63,74,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-deep-800 hover:shadow-[0_10px_20px_-4px_rgba(1,63,74,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] active:bg-deep-950",
        outline:
          "border-2 border-deep-900 text-deep-900 hover:bg-deep-900 hover:text-white hover:shadow-md",
        ghost: "text-deep-900 hover:bg-deep-50",
        outlineLight:
          "border-2 border-white/35 bg-white/5 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/15 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)]",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  children: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
