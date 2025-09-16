import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Saved from './pages/Saved'
import Hackathons from './pages/Hackathons'
import Admin from './pages/Admin'
import College from './pages/College'
import PostArticle from './pages/PostArticle'

function PrivateRoute({ roles, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

function Nav() {
  const { user, logout } = useAuth()
  return (
    <nav className="p-4 flex gap-4 border-b">
      <Link to="/" className="font-bold">Tech Orbit</Link>
      <Link to="/saved">My Saved</Link>
      <Link to="/hackathons">Hackathons</Link>
      {user && <Link to="/post">Post</Link>}
      {user?.role === 'College' && <Link to="/college">College</Link>}
      {user?.role === 'Admin' && <Link to="/admin">Admin</Link>}
      <div className="ml-auto flex gap-3">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign up</Link>}
        {user && <span className="text-sm text-gray-600">{user.email} ({user.role})</span>}
        {user && <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/saved" element={<PrivateRoute roles={["Student","College","Admin"]}><Saved /></PrivateRoute>} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/post" element={<PrivateRoute roles={["Student","College","Admin"]}><PostArticle /></PrivateRoute>} />
          <Route path="/college" element={<PrivateRoute roles={["College","Admin"]}><College /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute roles={["Admin"]}><Admin /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}


