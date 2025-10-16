import { validateRegister } from '../../_validations/auth.validations'
import { registerUserService } from '../../_services/auth.services'
import jwt from 'jsonwebtoken'

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json()

    const { message } = await validateRegister({ username, email, password })
    if (message) {
      return new Response(JSON.stringify({ message }), { status: 200 })
    }

    const user = await registerUserService({ username, email, password })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    )

    return new Response(
      JSON.stringify({
        user,
        token,
      }),
      { status: 201 }
    )
  } catch (err) {
    console.error('Register error:', err)
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
