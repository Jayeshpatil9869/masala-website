import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-full border border-transparent bg-[#f5f5f5] px-4 py-2 text-sm text-[#111111] transition-all outline-none placeholder:text-[#707072] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:bg-white focus-visible:border-[#111111] focus-visible:ring-4 focus-visible:ring-[#f5f5f5]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
