import { useCallback, useEffect, useRef } from 'react'

export function TaskInput({ value, onChange, onAdd }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = useCallback(
    (e) => {
      e?.preventDefault?.()
      const before = value
      onAdd()

      // условно: если реально добавляли (не пусто), вернём фокус на поле ввода
      if (before.trim()) {
        queueMicrotask(() => inputRef.current?.focus())
      } else {
        inputRef.current?.focus()
      }
    },
    [onAdd, value],
  )

  return (
    <form className="taskInput" onSubmit={submit}>
      <input
        ref={inputRef}
        className="taskField"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Новая задача…"
        aria-label="Новая задача"
      />
      <button className="btn btnPrimary" type="submit">
        Добавить
      </button>
    </form>
  )
}

