import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const [{ data: arts }, { data: us } ] = await Promise.all([
          api.get('/admin/articles'),
          api.get('/admin/users')
        ])
        setArticles(arts)
        setUsers(us)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const changeRole = async (userId, role) => {
    await api.patch(`/admin/users/${userId}/role`, { role })
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
  }

  const deleteArticle = async (id) => {
    await api.delete(`/admin/articles/${id}`)
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  if (loading) return <div>Loading admin data...</div>

  return (
    <div className="grid gap-6">
      <section>
        <h2 className="font-semibold mb-2">Recent Articles</h2>
        <div className="grid gap-2">
          {articles.map(a => (
            <div key={a.id} className="p-3 border rounded flex items-start gap-3">
              <div className="flex-1">
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-gray-600">{a.source} · {a.author_type}</div>
                <a className="text-blue-600 text-sm" href={a.url} target="_blank" rel="noreferrer">Open</a>
              </div>
              <button onClick={() => deleteArticle(a.id)} className="px-3 py-1 border rounded">Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Users</h2>
        <div className="grid gap-2">
          {users.map(u => (
            <div key={u.id} className="p-3 border rounded flex items-center gap-3">
              <div className="flex-1">
                <div className="font-semibold">{u.email}</div>
                <div className="text-sm text-gray-600">{u.full_name}</div>
              </div>
              <select value={u.role} onChange={e => changeRole(u.id, e.target.value)} className="border p-1 rounded">
                <option>Student</option>
                <option>College</option>
                <option>Admin</option>
              </select>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


