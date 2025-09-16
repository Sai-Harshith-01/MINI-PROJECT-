import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import api from '../lib/api'

export default function Hackathons() {
  const { user } = useAuth()
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/hackathons')
      setList(data)
    })()
  }, [])

  const register = async (id) => {
    await api.post(`/hackathons/${id}/register`)
    alert('Registered!')
  }

  return (
    <div className="grid gap-3">
      {list.map(h => (
        <div key={h.id} className="p-3 border rounded">
          <div className="font-semibold">{h.title}</div>
          <div className="text-sm text-gray-600">{h.date}</div>
          <p className="text-sm mt-1">{h.description}</p>
          {user?.role === 'Student' && (
            <button onClick={() => register(h.id)} className="mt-2 px-3 py-1 border rounded">Register</button>
          )}
        </div>
      ))}
    </div>
  )
}


