// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  // 🔁 Keep localStorage in sync with state
  useEffect(() => {
    if (role) localStorage.setItem('role', role)
    else localStorage.removeItem('role')

    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')

    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [role, token, user])

  // 🔓 Logout function
  const logout = () => {
    setRole(null)
    setToken(null)
    setUser(null)
    // Only remove auth-related items instead of clearing all localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ role, setRole, token, setToken, user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)