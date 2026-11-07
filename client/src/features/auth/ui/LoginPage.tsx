import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import './auth.css'

function LoginPage() {
  const { handleSubmit, isSubmitting, message } = useLogin()

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-heading">
        <p className="auth-brand">memoire</p>
        <h1 id="auth-heading">Welcome back</h1>
        <p className="auth-subtitle">Log in to revisit your memories.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="auth-status" role="status">{message}</p>
        <Link to="/register">Create an account</Link>
      </section>
    </main>
  )
}

export default LoginPage
