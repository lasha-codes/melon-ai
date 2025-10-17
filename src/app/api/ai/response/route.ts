import { getAiResponse } from '../../_services/ai.services'

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json()

    const response = await getAiResponse(prompt)

    return new Response(JSON.stringify({ response }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
