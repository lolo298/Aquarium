"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import NextLink from "next/link";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative z-0 box-content flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#00000055,#00000055_40%,#FFFFFF18_60%,#FFFFFF18)] *:z-20 before:absolute before:inset-1 before:-z-10 before:rounded-full after:absolute after:inset-0 after:z-10 after:size-1/2 after:bg-no-repeat disabled:cursor-not-allowed disabled:text-slate-600 disabled:before:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "before:bg-button-bg-primary hover:before:brightness-95 after:bg-radient-[circle_closest-side] after:from-white/30 text-white after:left-[7%] after:top-[7%]",
        secondary:
          "text-button-text-secondary hover:before:brightness-95 before:bg-button-bg-secondary after:bg-radient-[circle_closest-side] after:from-white after:left-[10%] after:top-[10%]",
        destructive: "",
        ghost: "before:bg-slate-100 text-slate-600",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-11 px-8 py-2",
        icon: "aspect-square w-fit h-fit p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "icon",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return React.createElement("button", {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props,
    });
  },
);
Button.displayName = "Button";

const Link = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    return React.createElement("a", {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      href,
      ...props,
    });
  },
);

Link.displayName = "Link";

export { Button, Link, buttonVariants };
