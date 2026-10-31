import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Hard-edged: a solid fill, a 2px outline and an offset shadow that closes up on press.
const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "border-2 border-deep-900 bg-primary-600 text-white shadow-[3px_3px_0_0_var(--navy)] hover:-translate-x-px hover:-translate-y-px hover:bg-primary-700 hover:shadow-[5px_5px_0_0_var(--navy)]",
        secondary:
          "border-2 border-deep-900 bg-deep-900 text-white shadow-[3px_3px_0_0_var(--blue)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--blue)]",
        outline:
          "border-2 border-deep-900 bg-white text-deep-900 shadow-[3px_3px_0_0_var(--navy)] hover:-translate-x-px hover:-translate-y-px hover:bg-deep-900 hover:text-white hover:shadow-[5px_5px_0_0_var(--navy)]",
        outlineLight:
          "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-deep-900",
        ghost: "text-deep-900 hover:bg-deep-50",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-base",
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

export function Button({ className, variant, size, href, children, ...props }: ButtonProps) {
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
