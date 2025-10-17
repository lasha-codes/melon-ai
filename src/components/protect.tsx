'use client'

import { useContext, useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { AuthContext } from '@/context/AuthContext'

const Protect = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { auth, loading } = useContext(AuthContext)

  useEffect(() => {
    if (loading) return

    const isAuthenticated = !!auth

    if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
      redirect('/')
    }
  }, [auth, loading, pathname])

  return <>{children}</>
}

export default Protect
