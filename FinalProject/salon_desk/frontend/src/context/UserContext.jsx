// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // 🔁 Persist all values in localStorage
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
    <UserContext.Provider value={{ role, setRole, token, setToken, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)