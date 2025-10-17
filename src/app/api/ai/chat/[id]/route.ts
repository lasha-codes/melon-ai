import { getChatService } from '@/app/api/_services/ai.services'

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ user: null }))
    }
    const token = authHeader.split(' ')[1]

    const { id } = await params

    if (!id) {
      return new Response(JSON.stringify({ chat: null }), { status: 200 })
    }

    const chat = await getChatService({ token, id })

    return new Response(JSON.stringify({ chat }))
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
