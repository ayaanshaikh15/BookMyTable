import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {
  // const [user, setUser] = useState({
  //   "name":"ayaan",
  //   "role":"customer"
  // })
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
