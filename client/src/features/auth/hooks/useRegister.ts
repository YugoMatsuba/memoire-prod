import { useState } from 'react'
import type { FormEvent } from 'react'

function useRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsSubmitting(true)
    setMessage('')

    try {
      // Placeholder URL until the backend endpoint is implemented.
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          username: formData.get('username'),
        }),
      })

      if (!response.ok) throw new Error('Registration request failed')
      setMessage('Registration request succeeded.')
    } catch {
      setMessage('Unable to register. The dummy API endpoint is not connected yet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { handleSubmit, isSubmitting, message }
}

export default useRegister
