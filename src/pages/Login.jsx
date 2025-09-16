import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (e) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto grid gap-3">
      <h1 className="text-xl font-semibold">Login</h1>
      <input className="border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="border p-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="px-3 py-2 border rounded">{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  )
}


