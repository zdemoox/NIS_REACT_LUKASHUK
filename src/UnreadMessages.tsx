import { useEffect, useMemo, useState } from 'react'

type PluralForm = 'one' | 'few' | 'many'

function getPluralFormRu(n: number): PluralForm {
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod10 === 1 && mod100 !== 11) return 'one'
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'few'
  return 'many'
}

function formatRuShortDateTime(d: Date): string {
  const parts = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(d)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ''

  const day = get('day')
  const month = get('month').replace('.', '')
  const hour = get('hour')
  const minute = get('minute')
  const second = get('second')

  return `${day} ${month} ${hour}:${minute}:${second}`
}

export function UnreadMessages() {
  const [n, setN] = useState<number | null>(null)
  const [lastMessageAt, setLastMessageAt] = useState<Date | null>(null)

  useEffect(() => {
    setN(Math.floor(Math.random() * 10) + 1)
    setLastMessageAt(new Date())
  }, [])

  const text = useMemo(() => {
    if (n == null || lastMessageAt == null) return 'Загрузка…'

    const form = getPluralFormRu(n)

    const adj = form === 'one' ? 'непрочитанное' : 'непрочитанных'
    const noun =
      form === 'one' ? 'сообщение' : form === 'few' ? 'сообщения' : 'сообщений'

    return `У вас ${n} ${adj} ${noun} (сегодня ${formatRuShortDateTime(lastMessageAt)})`
  }, [n, lastMessageAt])

  return <div style={{ fontSize: 20, fontWeight: 600 }}>{text}</div>
}

