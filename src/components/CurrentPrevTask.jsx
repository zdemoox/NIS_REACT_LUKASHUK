import { useEffect, useRef } from 'react'

export function CurrentPrevTask({ current }) {
  const prevRef = useRef('')

  useEffect(() => {
    prevRef.current = current
  }, [current])

  return (
    <div className="currentPrev">
      <div className="currentPrevRow">
        <span className="currentPrevLabel">Текущая:</span>
        <span className="currentPrevValue">{current || '—'}</span>
      </div>
      <div className="currentPrevRow">
        <span className="currentPrevLabel">Предыдущая:</span>
        <span className="currentPrevValue">{prevRef.current || '—'}</span>
      </div>
    </div>
  )
}

