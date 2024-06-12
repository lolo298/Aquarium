"use client";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "box-content relative z-0 flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#00000055,#00000055_40%,#FFFFFF18_60%,#FFFFFF18)] *:z-20 before:absolute before:inset-1 before:rounded-full before:-z-10 after:absolute after:inset-0 after:z-10 after:size-1/2 after:bg-no-repeat",
  {
    variants: {
      variant: {
        default:
          "before:bg-button-bg-primary hover:before:brightness-95 after:bg-radient-[circle_closest-side] after:from-white/30 text-white after:left-[7%] after:top-[7%]",
        secondary:
          "text-button-text-secondary hover:before:brightness-95 before:bg-button-bg-secondary after:bg-radient-[circle_closest-side] after:from-white after:left-[10%] after:top-[10%]",
        destructive: "",
        ghost: "",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-11 px-8 py-2",
        icon: "h-10 w-10 p-2",
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
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    const Comp = href ? "a" : "button";
    return React.createElement(Comp, {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      href,
      ...props,
    });
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
