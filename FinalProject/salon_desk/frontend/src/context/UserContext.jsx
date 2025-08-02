// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // New

  // 🔁 Load from localStorage once on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedRole) setRole(storedRole)
    if (storedToken) setToken(storedToken)
    if (storedUser) setUser(JSON.parse(storedUser))

    setLoading(false)
  }, [])

  // 🔁 Sync to localStorage on change
  useEffect(() => {
    role ? localStorage.setItem('role', role) : localStorage.removeItem('role')
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
  }, [role, token, user])

  const logout = () => {
    setRole(null)
    setToken(null)
    setUser(null)
    localStorage.clear()
  }

  return (
    <UserContext.Provider value={{ role, setRole, token, setToken, user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)