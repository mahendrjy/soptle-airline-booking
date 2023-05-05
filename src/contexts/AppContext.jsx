import { createContext, useEffect, useState } from 'react'
import { data } from '../data'

export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {}
  )
  const [routes, setRoutes] = useState(
    JSON.parse(localStorage.getItem('routes')) || data
  )

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('routes', JSON.stringify(routes))
    if (routes.length === 0) {
      setRoutes(data)
    }
  }, [routes])

  return (
    <AppContext.Provider
      value={{ user, setUser, routes, setRoutes }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
