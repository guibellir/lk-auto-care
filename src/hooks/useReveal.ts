'use client'

import { useEffect, useRef, useState } from 'react'

type UseRevealOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/** Intersection Observer hook for scroll-reveal animations. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const {
    threshold = 0.12,
    // Trigger a bit before the element hits the middle of the viewport
    rootMargin = '0px 0px -10% 0px',
    once = true,
  } = options
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    // Mobile: fire earlier so motion finishes while still in view
    let rootMarginLocal = rootMargin
    let thresholdLocal = threshold
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches
    ) {
      rootMarginLocal = '0px 0px -6% 0px'
      thresholdLocal = Math.min(threshold, 0.08)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: thresholdLocal, rootMargin: rootMarginLocal },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}
