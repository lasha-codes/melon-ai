import { validateRegister } from '../../_validations/auth.validations'
import { registerUserService } from '../../_services/auth.services'
import jwt from 'jsonwebtoken'

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json()

    const { message } = await validateRegister({ username, email, password })

    if (message) {
      return new Response(JSON.stringify({ message }), { status: 400 })
    }

    const user = await registerUserService({ username, email, password })

    jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) {
          return new Response(
            JSON.stringify({ message: 'Something went wrong with jwt.' }),
            { status: 500 }
          )
        }

        return new Response(
          JSON.stringify({
            user,
            token,
          }),
          { status: 201 }
        )
      }
    )
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
    })
  }
}
