import React, { useState } from 'react'

export const CodeCopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      className="code-copy-button"
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}
