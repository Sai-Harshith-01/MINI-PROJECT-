import { useState } from 'react'
import api from '../lib/api'

export default function College() {
  const [article, setArticle] = useState({ title: '', summary: '', url: '', source: 'College', author_type: 'College' })
  const [hackathon, setHackathon] = useState({ title: '', date: '', description: '', rules: '' })

  const postArticle = async (e) => {
    e.preventDefault()
    await api.post('/articles', article)
    alert('Article posted')
  }
  const createHackathon = async (e) => {
    e.preventDefault()
    await api.post('/hackathons', hackathon)
    alert('Hackathon created')
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={postArticle} className="grid gap-2 p-3 border rounded">
        <h2 className="font-semibold">Post College Article</h2>
        <input className="border p-2 rounded" placeholder="Title" value={article.title} onChange={e=>setArticle({...article, title: e.target.value})} />
        <input className="border p-2 rounded" placeholder="URL" value={article.url} onChange={e=>setArticle({...article, url: e.target.value})} />
        <textarea className="border p-2 rounded" placeholder="Summary" value={article.summary} onChange={e=>setArticle({...article, summary: e.target.value})} />
        <button className="px-3 py-2 border rounded">Post</button>
      </form>

      <form onSubmit={createHackathon} className="grid gap-2 p-3 border rounded">
        <h2 className="font-semibold">Create Hackathon</h2>
        <input className="border p-2 rounded" placeholder="Title" value={hackathon.title} onChange={e=>setHackathon({...hackathon, title: e.target.value})} />
        <input className="border p-2 rounded" placeholder="Date" value={hackathon.date} onChange={e=>setHackathon({...hackathon, date: e.target.value})} />
        <textarea className="border p-2 rounded" placeholder="Description" value={hackathon.description} onChange={e=>setHackathon({...hackathon, description: e.target.value})} />
        <textarea className="border p-2 rounded" placeholder="Rules" value={hackathon.rules} onChange={e=>setHackathon({...hackathon, rules: e.target.value})} />
        <button className="px-3 py-2 border rounded">Create</button>
      </form>
    </div>
  )
}


