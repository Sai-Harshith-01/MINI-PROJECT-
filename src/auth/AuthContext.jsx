import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password })
    setToken(data.access_token)
    // decode payload to get role/email if backend doesn't return user
    const payload = JSON.parse(atob(data.access_token.split('.')[1]))
    setUser({ id: payload.sub, email, role: payload.role })
  }

  const signup = async (form) => {
    const { data } = await api.post('/users/signup', form)
    setToken(data.access_token)
    const payload = JSON.parse(atob(data.access_token.split('.')[1]))
    setUser({ id: payload.sub, email: form.email, role: payload.role })
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = useMemo(() => ({ user, token, login, logout, signup }), [user, token])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}


