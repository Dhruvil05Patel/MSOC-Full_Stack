// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    setRole(null)
    setToken(null)
    setUser(null)
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  // 🔁 Load from localStorage once on mount and validate token
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('role')
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken)
          const currentTime = Date.now() / 1000

          if (decoded.exp && decoded.exp < currentTime) {
            console.warn('⏳ Token expired. Logging out.')
            logout()
            setLoading(false)
            return
          }

          setToken(storedToken)
        } catch (err) {
          console.error('Invalid token. Logging out.')
          logout()
          setLoading(false)
          return
        }
      }

      if (storedRole) setRole(storedRole)
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error('Error parsing stored user:', e)
          localStorage.removeItem('user')
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 🔁 Sync to localStorage on change
  useEffect(() => {
    if (!loading) {
      try {
        if (role) localStorage.setItem('role', role)
        else localStorage.removeItem('role')

        if (token) localStorage.setItem('token', token)
        else localStorage.removeItem('token')

        if (user) localStorage.setItem('user', JSON.stringify(user))
        else localStorage.removeItem('user')
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [role, token, user, loading])

  return (
    <UserContext.Provider value={{ role, setRole, token, setToken, user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)