import Link from 'next/link'
import { phoneLink } from '@/lib/contact'
import { PhoneIcon } from '@/components/Icons'

/** Fixed bottom bar for mobile — Call + Book (high conversion on iOS). */
export function MobileCtaBar() {
  const tel = phoneLink()

  return (
    <div className="mobile-cta-bar" role="navigation" aria-label="Quick contact">
      {tel ? (
        <a className="btn btn-primary mobile-cta-call" href={tel}>
          <PhoneIcon size={18} />
          <span>Call us</span>
        </a>
      ) : null}
      <Link
        className={`btn ${tel ? 'btn-ghost' : 'btn-primary'} mobile-cta-book`}
        href="/#contact"
      >
        Book
      </Link>
    </div>
  )
}
