import { createMessageService } from '@/app/api/_services/ai.services'

export const POST = async (req: Request) => {
  try {
    const { prompt, chatId } = await req.json()
    if (!prompt || !chatId) {
      return new Response(JSON.stringify({ message: 'Invalid config.' }), {
        status: 400,
      })
    }

    const message = await createMessageService({
      chatId,
      sender: 'USER',
      content: prompt,
    })

    return new Response(JSON.stringify({ message }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
