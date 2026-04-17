"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export function InputSection({ title, defaultOpen = true, children }: InputSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border-2 border-[--border] bg-[--surface] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[--volt-glow] transition-colors"
      >
        <span className="text-sm font-semibold text-[--text-primary] tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[--text-muted] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 flex flex-col gap-5 border-t border-[--border]">
              <div className="h-1" aria-hidden="true" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
