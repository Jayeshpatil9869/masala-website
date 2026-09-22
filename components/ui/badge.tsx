import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-[#111111] text-white",
        secondary: "bg-[#f5f5f5] text-[#111111]",
        promo: "bg-white text-[#111111] border border-[#cacacb] text-[11px] font-medium tracking-wide",
        outline: "border border-[#cacacb] text-[#111111] bg-transparent",
        sale: "bg-transparent text-[#d30005] font-semibold p-0",
        destructive: "bg-[#d30005] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
