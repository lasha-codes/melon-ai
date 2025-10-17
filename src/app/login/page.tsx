'use client'

import { useContext, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import ButtonLoader from '@/components/ui/button-loader'
import logo from '../../../public/logo.webp'
import { loginService } from '@/services/auth'
import { AuthContext } from '@/context/AuthContext'

const Login = () => {
  const { setAuth } = useContext(AuthContext)

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      const data = await loginService(form)

      if (data?.message) {
        setLoading(false)
        return setError(data.message)
      }

      localStorage.setItem('melonai-jwt-token', data.token)
      setForm({
        email: '',
        password: '',
      })

      setAuth(data.user)
      setLoading(false)
      setError(null)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff8f0] to-[#fff2e0] px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6'>
        <div className='flex items-center justify-center gap-2'>
          <Image
            src={logo}
            alt='Melon.AI logo'
            width={65}
            height={65}
            className='object-contain'
          />
          <h1 className='text-3xl font-bold bg-gradient-to-r from-[#ffa516] to-[#ff7b00] bg-clip-text text-transparent'>
            Melon.AI
          </h1>
        </div>

        <div className='w-full text-center'>
          <h3 className='text-xl font-semibold text-gray-800'>Hello again!</h3>
          <p className='text-sm text-gray-500 mt-1'>
            Login to get started with Melon.AI
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-4 mt-2'
        >
          <Input
            type='email'
            name='email'
            placeholder='Email address'
            value={form.email}
            onChange={handleChange}
            required
            className='h-11 rounded-lg focus-visible:ring-[#ffa516]'
          />
          <Input
            type='password'
            name='password'
            placeholder='Password (min 6 characters)'
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className='h-11 rounded-lg focus-visible:ring-[#ffa516]'
          />

          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            type='submit'
            disabled={loading}
            className='mt-2 w-full h-11 flex items-center justify-center bg-[#ffa516] hover:bg-[#f59c0d] text-white rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm'
          >
            {loading ? <ButtonLoader /> : 'Login'}
          </button>
        </form>

        <p className='text-sm text-gray-500 mt-3'>
          Don't have an account?{' '}
          <a
            href='/signup'
            className='text-[#ffa516] font-medium hover:underline'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
