import { getUserService } from '../_services/auth.services'

export const GET = async (req: Request) => {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ user: null }))
    }

    const token = authHeader.split(' ')[1]

    const user = await getUserService(token)

    return new Response(JSON.stringify({ user }))
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
