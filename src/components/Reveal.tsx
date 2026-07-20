'use client'

import {
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { useReveal } from '@/hooks/useReveal'

export type RevealVariant =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'scale'
  | 'fade'
  | 'blur'
  | 'rise'

type RevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  /** Stagger index — multiplies base step (default 85ms) */
  delay?: number
  delayMs?: number
  as?: ElementType
  threshold?: number
  style?: CSSProperties
  /** Extra class applied only when visible (for child stagger hooks) */
  visibleClassName?: string
}

/** Scroll-triggered reveal animation wrapper. */
export function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  delayMs = 0,
  as = 'div',
  threshold,
  style,
  visibleClassName = '',
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold })

  const classes = [
    'reveal',
    `reveal-${variant}`,
    visible ? 'is-visible' : '',
    visible && visibleClassName ? visibleClassName : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const combinedStyle: CSSProperties = {
    ...style,
    ...(delay > 0 || delayMs > 0
      ? {
          transitionDelay: `${delay * 85 + delayMs}ms`,
        }
      : undefined),
  }

  return createElement(
    as,
    { ref, className: classes, style: combinedStyle },
    children,
  )
}
