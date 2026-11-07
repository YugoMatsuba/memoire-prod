import { Link } from 'react-router-dom'
import useRegister from '../hooks/useRegister'
import './auth.css'

function RegisterPage() {
  const { handleSubmit, isSubmitting, message } = useRegister()

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-heading">
        <p className="auth-brand">mémoire</p>
        <h1 id="auth-heading">Create an account</h1>
        <p className="auth-subtitle">A little space for your favorite memories.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="new-password" required />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" autoComplete="username" required />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering…' : 'Register'}
          </button>
        </form>
        <p className="auth-status" role="status">{message}</p>
        <Link to="/login">Already have an account? Log in</Link>
      </section>
    </main>
  )
}

export default RegisterPage
