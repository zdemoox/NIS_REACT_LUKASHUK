import { useMemo } from 'react'

export type FormValues = {
  name: string
  email: string
  password: string
}

export type FormValidity = {
  name: boolean
  email: boolean
  password: boolean
}

export type FormErrors = {
  name: string
  email: string
  password: string
}

const emailRegex =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export function useFormValidation(values: FormValues): {
  validity: FormValidity
  errors: FormErrors
} {
  const errors = useMemo<FormErrors>(() => {
    const trimmedName = values.name.trim()
    const trimmedEmail = values.email.trim()

    return {
      name:
        trimmedName.length >= 3 ? '' : 'Имя должно содержать хотя бы 3 символа',
      email: emailRegex.test(trimmedEmail) ? '' : 'Введите правильный email',
      password:
        values.password.length >= 6
          ? ''
          : 'Пароль должен содержать хотя бы 6 символов',
    }
  }, [values.email, values.name, values.password])

  const validity = useMemo<FormValidity>(() => {
    return {
      name: errors.name === '',
      email: errors.email === '',
      password: errors.password === '',
    }
  }, [errors.email, errors.name, errors.password])

  return { validity, errors }
}

