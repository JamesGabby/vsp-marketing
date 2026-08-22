"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

const DURATION = 550

// ease-out cubic: fast off the mark, settles gently on the new value
function ease(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Eases a whole series towards its new values so the chart redraws as a
 * movement rather than a jump. The `target` array must be referentially stable
 * between renders (memoise it) or every render restarts the animation.
 */
export function useAnimatedNumbers(target: number[]): number[] {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(target)
  // Mirrors what is actually on screen, updated every frame. Animating from
  // here rather than from the previous target means an effect that re-runs
  // mid-flight resumes from where the eye is, instead of freezing.
  const onScreen = useRef(target)
  const frame = useRef(0)

  useEffect(() => {
    // Reduced motion skips the tween; the hook returns the target directly.
    if (reduced) return

    const start = onScreen.current
    if (start.length === target.length && start.every((v, i) => v === target[i])) return

    const t0 = performance.now()

    function tick(now: number) {
      const t = Math.min((now - t0) / DURATION, 1)
      const e = ease(t)
      const next = target.map((to, i) => {
        const a = start[i] ?? to
        return a + (to - a) * e
      })
      onScreen.current = next
      setDisplay(next)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, reduced])

  return reduced ? target : display
}

/** Single-value twin of {@link useAnimatedNumbers}, for headline figures. */
export function useAnimatedNumber(target: number): number {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(target)
  const onScreen = useRef(target)
  const frame = useRef(0)

  useEffect(() => {
    if (reduced) return

    const start = onScreen.current
    if (start === target) return

    const t0 = performance.now()

    function tick(now: number) {
      const t = Math.min((now - t0) / DURATION, 1)
      const next = start + (target - start) * ease(t)
      onScreen.current = next
      setDisplay(next)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, reduced])

  return reduced ? target : display
}

/** Width of an element, tracked so the SVG can be laid out in real pixels. */
export function useMeasuredWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  fallback = 720
): number {
  const [width, setWidth] = useState(fallback)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Floored, because an SVG sized to a fractional container width can grow the
    // track it sits in, which grows the container, which fires the observer again.
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width)
      if (next > 0) setWidth((current) => (current === next ? current : next))
    })
    observer.observe(el)
    const initial = Math.floor(el.getBoundingClientRect().width)
    if (initial > 0) setWidth(initial)
    return () => observer.disconnect()
  }, [ref])

  return width
}
