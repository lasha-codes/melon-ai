'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { User } from '@prisma/client'
import { getUser } from '@/services/auth'

interface ContextType {
  auth: Partial<User> | undefined
  setAuth: SetStateAction<Dispatch<Partial<User>>>
  loading: boolean
  setLoading: SetStateAction<Dispatch<boolean>>
}

export const AuthContext = createContext<ContextType>({
  auth: undefined,
  setAuth: () => undefined,
  loading: true,
  setLoading: () => true,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Partial<User> | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getUser().then((user) => {
      setAuth(user)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
