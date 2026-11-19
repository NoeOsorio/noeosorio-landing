import { useEffect, useRef, useState } from 'react'
import { HiClipboardCopy } from 'react-icons/hi'
import { siteLinks } from '../data/siteLinks'

export const CopyEmail = () => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteLinks.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
      >
        <HiClipboardCopy className="w-5 h-5" aria-hidden="true" />
        {copied ? 'Copied' : 'Copy email'}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </>
  )
}
