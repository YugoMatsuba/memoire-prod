import { useState } from 'react'
import type { FormEvent } from 'react'

function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsSubmitting(true)
    setMessage('')

    try {
      // Placeholder URL until the backend endpoint is implemented.
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      if (!response.ok) throw new Error('Login request failed')
      setMessage('Login request succeeded.')
    } catch {
      setMessage('Unable to log in. The dummy API endpoint is not connected yet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting, message }
}

export default useLogin
