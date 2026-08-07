import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700/80 hover:bg-zinc-700/80",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
    outline: "text-zinc-400 border-zinc-800 hover:text-zinc-200",
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
