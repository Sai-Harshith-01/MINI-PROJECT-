import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Saved() {
  const [items, setItems] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/articles/saved')
      setItems(data)
    })()
  }, [])

  if (!items.length) return <div>No saved articles yet.</div>
  return (
    <div className="grid gap-3">
      {items.map(a => (
        <a key={a.id} className="p-3 border rounded" href={a.url} target="_blank" rel="noreferrer">
          <div className="text-xs text-gray-500">{a.source}</div>
          <div className="font-semibold">{a.title}</div>
          <div className="text-sm text-gray-700">{a.summary}</div>
        </a>
      ))}
    </div>
  )
}


