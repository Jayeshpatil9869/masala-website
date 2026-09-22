import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        default: "bg-[#111111] text-white hover:bg-black/90 active:bg-black",
        secondary: "bg-[#f5f5f5] text-[#111111] hover:bg-[#e5e5e5] active:bg-[#dcdcdc]",
        onImage: "bg-white text-[#111111] hover:bg-white/90 shadow-sm active:bg-gray-100",
        outline: "border border-[#cacacb] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-black/5",
        ghost: "hover:bg-[#f5f5f5] text-[#111111]",
        link: "text-[#111111] underline-offset-4 hover:underline",
        destructive: "bg-[#d30005] text-white hover:bg-[#780700]",
      },
      size: {
        default: "h-12 px-8 py-3.5 text-base font-medium",
        sm: "h-9 px-4 text-xs font-medium",
        lg: "h-14 px-10 text-lg font-medium",
        icon: "h-10 w-10 rounded-full p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
