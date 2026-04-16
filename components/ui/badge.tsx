import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[--ring]",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[--volt] text-[--volt-foreground]",
        secondary:
          "border-transparent bg-[--secondary] text-[--secondary-foreground]",
        outline:
          "border-[--border] text-[--text-secondary]",
        muted:
          "border-[--border] bg-[--surface] text-[--text-muted]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
