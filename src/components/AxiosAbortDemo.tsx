import { useMemo, useRef, useState } from 'react'
import { axiosClient } from '../lib/axiosClient'
import type { User } from '../services/usersApi'

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; users: User[] }
  | { status: 'error'; message: string }
  | { status: 'aborted' }

export function AxiosAbortDemo() {
  const controllerRef = useRef<AbortController | null>(null)
  const [state, setState] = useState<LoadState>({ status: 'idle' })

  const canLoad = state.status !== 'loading'
  const canAbort = state.status === 'loading'

  const summary = useMemo(() => {
    switch (state.status) {
      case 'idle':
        return 'Idle'
      case 'loading':
        return 'Loading…'
      case 'success':
        return `Loaded ${state.users.length} users`
      case 'error':
        return `Error: ${state.message}`
      case 'aborted':
        return 'Aborted'
    }
  }, [state])

  async function load() {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setState({ status: 'loading' })

    try {
      const res = await axiosClient.get<User[]>('/users', {
        signal: controller.signal,
      })
      setState({ status: 'success', users: res.data })
    } catch (e: unknown) {
      if (controller.signal.aborted) {
        setState({ status: 'aborted' })
        return
      }
      const message =
        e && typeof e === 'object' && 'message' in e ? String(e.message) : String(e)
      setState({ status: 'error', message })
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null
    }
  }

  function abort() {
    controllerRef.current?.abort()
  }

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="status">
          <span className="badge">{state.status}</span>
          <span className="muted">{summary}</span>
        </div>
        <div className="row">
          <button className="btnPrimary" onClick={load} disabled={!canLoad} type="button">
            GET users via Axios
          </button>
          <button className="btn" onClick={abort} disabled={!canAbort} type="button">
            Cancel loading
          </button>
        </div>
      </div>

      {state.status === 'success' ? (
        <div className="table">
          <div className="tableHead">
            <div>Name</div>
            <div>Email</div>
            <div></div>
          </div>
          {state.users.map((u) => (
            <div className="tableRow" key={u.id}>
              <div className="cell">
                <span className="mono">{u.name}</span>
              </div>
              <div className="cell">{u.email}</div>
              <div className="cell muted">Authorization injected</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

