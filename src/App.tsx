import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './App.css'
import { useFormValidation, type FormValues } from './hooks/useFormValidation'

function App() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const { validity, errors } = useFormValidation(values)

  useEffect(() => {
    setIsFormValid(Object.values(validity).every(Boolean))
  }, [validity])

  const showErrors = useMemo(() => {
    return submitAttempted && !isFormValid
  }, [isFormValid, submitAttempted])

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setValues((prev) => ({ ...prev, name: next }))
      setSuccessMessage('')
    },
    [],
  )

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setValues((prev) => ({ ...prev, email: next }))
      setSuccessMessage('')
    },
    [],
  )

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setValues((prev) => ({ ...prev, password: next }))
      setSuccessMessage('')
    },
    [],
  )

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setSubmitAttempted(true)
      setSuccessMessage('')

      if (!isFormValid) {
        if (!validity.name) {
          nameRef.current?.focus()
          return
        }
        if (!validity.email) {
          emailRef.current?.focus()
          return
        }
        if (!validity.password) {
          passwordRef.current?.focus()
          return
        }
        return
      }

      setSuccessMessage('Форма успешно отправлена')
    },
    [isFormValid, validity.email, validity.name, validity.password],
  )

  return (
    <main className="page">
      <section className="card" aria-label="User form">
        <header className="cardHeader">
          <h1 className="title">Данные пользователя</h1>
          <p className="subtitle">Имя, email и пароль</p>
        </header>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label className="label" htmlFor="name">
              Имя
            </label>
            <input
              ref={nameRef}
              id="name"
              name="name"
              className="input"
              value={values.name}
              onChange={onChangeName}
              autoComplete="name"
              required
              aria-invalid={showErrors && !validity.name}
              aria-describedby={showErrors && !validity.name ? 'name-error' : undefined}
            />
            {showErrors && !validity.name ? (
              <div className="error" id="name-error" role="alert">
                {errors.name}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              className="input"
              type="email"
              value={values.email}
              onChange={onChangeEmail}
              autoComplete="email"
              required
              aria-invalid={showErrors && !validity.email}
              aria-describedby={showErrors && !validity.email ? 'email-error' : undefined}
            />
            {showErrors && !validity.email ? (
              <div className="error" id="email-error" role="alert">
                {errors.email}
              </div>
            ) : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="password">
              Пароль
            </label>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              className="input"
              type="password"
              value={values.password}
              onChange={onChangePassword}
              autoComplete="new-password"
              required
              aria-invalid={showErrors && !validity.password}
              aria-describedby={
                showErrors && !validity.password ? 'password-error' : undefined
              }
            />
            {showErrors && !validity.password ? (
              <div className="error" id="password-error" role="alert">
                {errors.password}
              </div>
            ) : null}
          </div>

          <div className="actions">
            <button className="submit" type="submit" disabled={!isFormValid}>
              Отправить
            </button>
            {successMessage ? (
              <div className="success" role="status" aria-live="polite">
                {successMessage}
              </div>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
