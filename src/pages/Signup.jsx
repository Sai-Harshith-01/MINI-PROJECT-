import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', full_name: '', role: 'Student' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await signup(form)
      navigate('/')
    } catch (e) {
      setError('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto grid gap-3">
      <h1 className="text-xl font-semibold">Sign up</h1>
      <input className="border p-2 rounded" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} />
      <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <input type="password" className="border p-2 rounded" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
      <select className="border p-2 rounded" value={form.role} onChange={e=>setForm({...form, role: e.target.value})}>
        <option>Student</option>
        <option>College</option>
        <option>Admin</option>
      </select>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="px-3 py-2 border rounded">{loading ? 'Creating...' : 'Create account'}</button>
    </form>
  )
}


