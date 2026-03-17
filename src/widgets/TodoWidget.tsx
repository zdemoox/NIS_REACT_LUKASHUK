import { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { useLocalStorageState } from '../hooks/useLocalStorage'

type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

const Card = styled.section`
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  text-align: left;
  background: color-mix(in srgb, var(--bg) 92%, var(--social-bg));
`

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`

const Muted = styled.span`
  color: var(--text);
  font-size: 13px;
`

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`

const Input = styled.input`
  flex: 1 1 auto;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  background: var(--bg);
  color: var(--text-h);

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`

const Button = styled.button<{ $variant?: 'primary' | 'ghost' }>`
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid var(--border);
  color: var(--text-h);
  background: var(--bg);

  ${(p) =>
    p.$variant === 'primary' &&
    css`
      border-color: var(--accent-border);
      background: var(--accent-bg);
      color: var(--accent);
    `}

  ${(p) =>
    p.$variant === 'ghost' &&
    css`
      background: transparent;
      color: var(--text);
    `}

  &:hover {
    box-shadow: var(--shadow);
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
`

const Item = styled.li<{ $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg);

  ${(p) =>
    p.$done &&
    css`
      opacity: 0.75;
    `}
`

const Text = styled.span<{ $done: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  color: var(--text-h);

  ${(p) =>
    p.$done &&
    css`
      text-decoration: line-through;
      color: var(--text);
    `}
`

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin: 6px 0 10px;
`

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function TodoWidget() {
  const [todos, setTodos] = useLocalStorageState<Todo[]>('todos', [])
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const stats = useMemo(() => {
    const total = todos.length
    const done = todos.filter((t) => t.done).length
    return { total, done }
  }, [todos])

  function addTodo(raw: string) {
    const trimmed = raw.trim()
    if (trimmed.length < 2) {
      setError('Минимум 2 символа')
      return
    }
    setError(null)
    const todo: Todo = { id: uid(), text: trimmed, done: false, createdAt: Date.now() }
    setTodos((prev) => [todo, ...prev])
    setText('')
  }

  return (
    <Card>
      <TitleRow>
        <div>
          <h2 style={{ margin: 0 }}>To‑Do</h2>
          <Muted>
            {stats.done}/{stats.total} done
          </Muted>
        </div>
        <Button
          type="button"
          $variant="ghost"
          onClick={() => setTodos((prev) => prev.filter((t) => !t.done))}
          disabled={todos.every((t) => !t.done)}
          aria-disabled={todos.every((t) => !t.done)}
        >
          Clear done
        </Button>
      </TitleRow>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(text)
        }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача…"
          aria-label="New todo"
        />
        <Button $variant="primary" type="submit">
          Add
        </Button>
      </Form>

      {error && <ErrorText role="alert">{error}</ErrorText>}

      <List>
        {todos.map((t) => (
          <Item key={t.id} $done={t.done}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() =>
                setTodos((prev) => prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
              }
              aria-label={t.done ? 'Mark as not done' : 'Mark as done'}
            />
            <Text $done={t.done}>{t.text}</Text>
            <Button type="button" $variant="ghost" onClick={() => setTodos((p) => p.filter((x) => x.id !== t.id))}>
              ✕
            </Button>
          </Item>
        ))}
      </List>
    </Card>
  )
}

