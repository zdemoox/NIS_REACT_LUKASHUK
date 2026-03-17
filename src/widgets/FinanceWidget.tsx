import type React from 'react'
import { useMemo, useState } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorage'

type Tx = {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  createdAt: number
}

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function FinanceWidget() {
  const [txs, setTxs] = useLocalStorageState<Tx[]>('finance.txs', [])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState<string>('')
  const [type, setType] = useState<Tx['type']>('expense')
  const [error, setError] = useState<string | null>(null)

  const summary = useMemo(() => {
    const income = txs.filter((t) => t.type === 'income').reduce((a, b) => a + b.amount, 0)
    const expense = txs.filter((t) => t.type === 'expense').reduce((a, b) => a + b.amount, 0)
    return { income, expense, balance: income - expense }
  }, [txs])

  const styles: Record<string, React.CSSProperties> = {
    card: {
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 16,
      textAlign: 'left',
      background: 'color-mix(in srgb, var(--bg) 92%, var(--social-bg))',
    },
    row: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 },
    muted: { color: 'var(--text)', fontSize: 13 },
    form: { display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' },
    input: {
      flex: '1 1 160px',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '10px 12px',
      fontSize: 14,
      background: 'var(--bg)',
      color: 'var(--text-h)',
    },
    select: {
      flex: '0 0 130px',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '10px 12px',
      fontSize: 14,
      background: 'var(--bg)',
      color: 'var(--text-h)',
    },
    btn: {
      flex: '0 0 auto',
      border: '1px solid var(--accent-border)',
      borderRadius: 12,
      padding: '10px 12px',
      fontSize: 14,
      cursor: 'pointer',
      background: 'var(--accent-bg)',
      color: 'var(--accent)',
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 12 },
    stat: { border: '1px solid var(--border)', borderRadius: 12, padding: 12, background: 'var(--bg)' },
    list: { listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gap: 8 },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      border: '1px solid var(--border)',
      borderRadius: 12,
      background: 'var(--bg)',
    },
    badge: {
      fontSize: 12,
      padding: '2px 8px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      color: 'var(--text)',
    },
    title: { flex: '1 1 auto', minWidth: 0, color: 'var(--text-h)' },
    amount: { fontVariantNumeric: 'tabular-nums', fontWeight: 600 },
    del: { border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text)' },
    error: { color: '#ef4444', fontSize: 13, marginTop: 8 },
  }

  function addTx() {
    const t = title.trim()
    const a = Number(amount.replace(',', '.'))
    if (t.length < 2) return setError('Название: минимум 2 символа')
    if (!Number.isFinite(a) || a <= 0) return setError('Сумма: число > 0')
    setError(null)

    const tx: Tx = { id: uid(), title: t, amount: a, type, createdAt: Date.now() }
    setTxs((prev) => [tx, ...prev])
    setTitle('')
    setAmount('')
    setType('expense')
  }

  return (
    <section style={styles.card}>
      <div style={styles.row}>
        <div>
          <h2 style={{ margin: 0 }}>Финансы</h2>
          <div style={styles.muted}>Мини-трекер доходов/расходов</div>
        </div>
        <button
          type="button"
          onClick={() => setTxs([])}
          style={{ ...styles.del, padding: 6 }}
          disabled={txs.length === 0}
        >
          Clear
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.stat}>
          <div style={styles.muted}>Income</div>
          <div style={{ ...styles.amount, color: 'var(--text-h)' }}>{summary.income.toFixed(2)}</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.muted}>Expense</div>
          <div style={{ ...styles.amount, color: 'var(--text-h)' }}>{summary.expense.toFixed(2)}</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.muted}>Balance</div>
          <div
            style={{
              ...styles.amount,
              color: summary.balance >= 0 ? '#22c55e' : '#ef4444',
            }}
          >
            {summary.balance.toFixed(2)}
          </div>
        </div>
      </div>

      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          addTx()
        }}
      >
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Описание…"
          aria-label="Title"
        />
        <input
          style={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Сумма…"
          inputMode="decimal"
          aria-label="Amount"
        />
        <select style={styles.select} value={type} onChange={(e) => setType(e.target.value as Tx['type'])}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button style={styles.btn} type="submit">
          Add
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      <ul style={styles.list}>
        {txs.map((t) => (
          <li key={t.id} style={styles.item}>
            <span style={styles.badge}>{t.type}</span>
            <span style={styles.title}>{t.title}</span>
            <span style={{ ...styles.amount, color: t.type === 'income' ? '#22c55e' : '#ef4444' }}>
              {t.type === 'income' ? '+' : '-'}
              {t.amount.toFixed(2)}
            </span>
            <button type="button" onClick={() => setTxs((p) => p.filter((x) => x.id !== t.id))} style={styles.del}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

