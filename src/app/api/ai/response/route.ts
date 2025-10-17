import {
  createMessageService,
  getAiResponse,
} from '../../_services/ai.services'

export const POST = async (req: Request) => {
  try {
    const { prompt, chatId } = await req.json()

    if (!prompt || !chatId) {
      return new Response(JSON.stringify({ message: 'Invalid config.' }), {
        status: 400,
      })
    }

    const response = await getAiResponse(prompt)

    const message = await createMessageService({
      chatId,
      sender: 'AI',
      content: response,
    })

    return new Response(JSON.stringify({ message }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
