import axios from 'axios'

export const registerService = async ({
  username,
  password,
  email,
}: {
  username: string
  email: string
  password: string
}) => {
  const { data } = await axios.post('/api/auth/register', {
    username,
    password,
    email,
  })

  return data
}

export const loginService = async ({
  password,
  email,
}: {
  email: string
  password: string
}) => {
  const { data } = await axios.post('/api/auth/login', {
    password,
    email,
  })

  return data
}

export const getUser = async () => {
  const token = localStorage.getItem('melonai-jwt-token')
  if (!token) return null

  const { data } = await axios.get('/api/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data?.user
}
