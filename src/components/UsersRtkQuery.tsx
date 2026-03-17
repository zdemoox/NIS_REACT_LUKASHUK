import { FormEvent, useMemo, useState } from 'react'
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  type User,
} from '../services/usersApi'

type Draft = { name: string; email: string }

function validateDraft(d: Draft) {
  const name = d.name.trim()
  const email = d.email.trim()
  if (!name) return 'Name is required'
  if (!email) return 'Email is required'
  if (!email.includes('@')) return 'Email looks invalid'
  return null
}

export function UsersRtkQuery() {
  const { data, isLoading, isFetching, error, refetch } = useGetUsersQuery()
  const [createUser, createState] = useCreateUserMutation()
  const [updateUser, updateState] = useUpdateUserMutation()

  const [createDraft, setCreateDraft] = useState<Draft>({
    name: '',
    email: '',
  })

  const [editingId, setEditingId] = useState<number | null>(null)
  const editingUser = useMemo(
    () => data?.find((u) => u.id === editingId) ?? null,
    [data, editingId],
  )
  const [editDraft, setEditDraft] = useState<Draft>({ name: '', email: '' })

  function startEdit(u: User) {
    setEditingId(u.id)
    setEditDraft({ name: u.name ?? '', email: u.email ?? '' })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditDraft({ name: '', email: '' })
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault()
    const msg = validateDraft(createDraft)
    if (msg) return
    await createUser({
      name: createDraft.name.trim(),
      email: createDraft.email.trim(),
    }).unwrap()
    setCreateDraft({ name: '', email: '' })
  }

  async function onSaveEdit() {
    if (!editingUser) return
    const msg = validateDraft(editDraft)
    if (msg) return
    await updateUser({
      id: editingUser.id,
      name: editDraft.name.trim(),
      email: editDraft.email.trim(),
    }).unwrap()
    cancelEdit()
  }

  const createError =
    createState.error && 'status' in createState.error
      ? JSON.stringify(createState.error)
      : createState.error
        ? String(createState.error)
        : null

  const updateError =
    updateState.error && 'status' in updateState.error
      ? JSON.stringify(updateState.error)
      : updateState.error
        ? String(updateState.error)
        : null

  return (
    <div className="stack">
      <div className="toolbar">
        <div className="status">
          <span className="badge">{isLoading ? 'loading' : 'ready'}</span>
          {isFetching ? <span className="muted">refreshing…</span> : null}
        </div>
        <button className="btn" onClick={() => refetch()} type="button">
          Refetch
        </button>
      </div>

      <form className="form" onSubmit={onCreate}>
        <div className="formRow">
          <label className="label">
            Name
            <input
              className="input"
              value={createDraft.name}
              onChange={(e) =>
                setCreateDraft((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="e.g. Ada Lovelace"
            />
          </label>
          <label className="label">
            Email
            <input
              className="input"
              value={createDraft.email}
              onChange={(e) =>
                setCreateDraft((s) => ({ ...s, email: e.target.value }))
              }
              placeholder="e.g. ada@lovelace.dev"
            />
          </label>
        </div>
        <div className="formActions">
          <button className="btnPrimary" disabled={createState.isLoading}>
            {createState.isLoading ? 'Creating…' : 'Add user (POST)'}
          </button>
          {createError ? <span className="error">{createError}</span> : null}
        </div>
      </form>

      {error ? (
        <div className="errorBlock">
          Failed to load users: {JSON.stringify(error)}
        </div>
      ) : null}

      <div className="table">
        <div className="tableHead">
          <div>Name</div>
          <div>Email</div>
          <div className="tableActions">Actions</div>
        </div>

        {(data ?? []).map((u) => {
          const isEditing = editingId === u.id
          return (
            <div className="tableRow" key={u.id}>
              <div className="cell">
                {isEditing ? (
                  <input
                    className="input"
                    value={editDraft.name}
                    onChange={(e) =>
                      setEditDraft((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                ) : (
                  <span className="mono">{u.name}</span>
                )}
              </div>
              <div className="cell">
                {isEditing ? (
                  <input
                    className="input"
                    value={editDraft.email}
                    onChange={(e) =>
                      setEditDraft((s) => ({ ...s, email: e.target.value }))
                    }
                  />
                ) : (
                  <span>{u.email}</span>
                )}
              </div>
              <div className="cell tableActions">
                {isEditing ? (
                  <div className="row">
                    <button
                      className="btnPrimary"
                      onClick={onSaveEdit}
                      disabled={updateState.isLoading}
                      type="button"
                    >
                      {updateState.isLoading ? 'Saving…' : 'Save (PUT)'}
                    </button>
                    <button className="btn" onClick={cancelEdit} type="button">
                      Cancel
                    </button>
                    {updateError ? (
                      <span className="error">{updateError}</span>
                    ) : null}
                  </div>
                ) : (
                  <button className="btn" onClick={() => startEdit(u)} type="button">
                    Edit
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

