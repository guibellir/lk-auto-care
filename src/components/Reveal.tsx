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

type RevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  delayMs?: number
  as?: ElementType
  threshold?: number
  style?: CSSProperties
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
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>({ threshold })

  const classes = [
    'reveal',
    `reveal-${variant}`,
    visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const combinedStyle: CSSProperties = {
    ...style,
    ...(delay > 0 || delayMs > 0
      ? {
          transitionDelay: `${delay * 70 + delayMs}ms`,
        }
      : undefined),
  }

  return createElement(
    as,
    { ref, className: classes, style: combinedStyle },
    children,
  )
}
