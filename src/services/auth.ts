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
