import { createChatService, getChatsService } from '../../_services/ai.services'

export const POST = async (req: Request) => {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ chat: null }))
    }
    const token = authHeader.split(' ')[1]

    const { prompt } = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'Prompt must be provided.' }),
        { status: 400 }
      )
    }

    const chat = await createChatService({ token, prompt })

    return new Response(JSON.stringify({ chat }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}

export const GET = async (req: Request) => {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ chat: null }))
    }
    const token = authHeader.split(' ')[1]

    const chats = await getChatsService(token)

    return new Response(JSON.stringify({ chats }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
