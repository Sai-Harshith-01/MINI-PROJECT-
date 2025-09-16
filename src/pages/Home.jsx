import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'
import { useAuth } from '../auth/AuthContext'

export default function Home() {
  const { user } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [likingId, setLikingId] = useState(null)

  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/articles', { params: { q, page, page_size: 5 } })
      setArticles(data)
      setLoading(false)
    })()
  }, [q, page])

  const save = async (id) => {
    try {
      setSavingId(id)
      await api.post(`/articles/${id}/save`)
      alert('Saved!')
    } finally {
      setSavingId(null)
    }
  }

  const like = async (id, liked) => {
    setLikingId(id)
    try {
      if (liked) await api.delete(`/articles/${id}/like`)
      else await api.post(`/articles/${id}/like`)
      // optimistic: not tracking per-user liked; refresh count
      const { data } = await api.get(`/articles/${id}/likes`)
      setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: data.count } : a))
    } finally {
      setLikingId(null)
    }
  }

  if (loading) return <div>Loading latest news...</div>

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <input className="border p-2 rounded flex-1" placeholder="Search articles..." value={q} onChange={e=>{ setPage(1); setQ(e.target.value) }} />
        <button className="px-3 py-2 border rounded" onClick={()=>setPage(1)}>Search</button>
      </div>
      {articles.map((a, idx) => (
        <motion.div key={a.id}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
          className="p-4 border rounded hover:shadow-md">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="text-xs text-gray-500">{a.source}</div>
              <a href={a.url} target="_blank" rel="noreferrer" className="font-semibold text-lg hover:underline">{a.title}</a>
              <p className="text-sm text-gray-700 mt-1">{a.summary}</p>
            </div>
            <div className="flex flex-col gap-2 self-start">
              {user && (
                <button onClick={() => save(a.id)} disabled={savingId===a.id}
                  className="h-9 px-3 border rounded">
                  {savingId===a.id ? 'Saving...' : 'Save'}
                </button>
              )}
              <button onClick={() => like(a.id, false)} disabled={likingId===a.id}
                className="h-9 px-3 border rounded">
                ❤ {a.likes ?? 0}
              </button>
            </div>
          </div>

          <Comments articleId={a.id} />
        </motion.div>
      ))}
      <div className="flex justify-between">
        <button className="px-3 py-1 border rounded" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <button className="px-3 py-1 border rounded" onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}

function Comments({ articleId }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/articles/${articleId}/comments`)
      setItems(data)
    } finally { setLoading(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await api.post(`/articles/${articleId}/comments`, { text })
    setText('')
    await load()
  }

  return (
    <div className="mt-3 border-t pt-3">
      <button className="text-sm text-blue-600" onClick={() => { const n=!open; setOpen(n); if (n) load() }}>
        {open ? 'Hide comments' : 'Show comments'}
      </button>
      {open && (
        <div className="mt-2 grid gap-2">
          {loading ? <div className="text-sm text-gray-500">Loading...</div> : (
            items.length ? items.map(c => (
              <div key={c.id} className="text-sm"><span className="text-gray-500">{c.user_id?.slice(-6)}:</span> {c.text}</div>
            )) : <div className="text-sm text-gray-500">No comments yet.</div>
          )}
          {user && (
            <form onSubmit={submit} className="flex gap-2">
              <input className="border p-2 rounded flex-1" placeholder="Add a comment..." value={text} onChange={e=>setText(e.target.value)} />
              <button className="px-3 py-2 border rounded">Post</button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}


