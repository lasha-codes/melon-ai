import { validateLogin } from '../../_validations/auth.validations'
import { loginUserService } from '../../_services/auth.services'
import jwt from 'jsonwebtoken'

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    const { message } = await validateLogin({ email, password })
    if (message) {
      return new Response(JSON.stringify({ message }), { status: 200 })
    }

    const user = await loginUserService({ email, password })

    if (user?.message && !user?.user) {
      return new Response(JSON.stringify({ message: user.message }), {
        status: 200,
      })
    }

    const token = jwt.sign(
      { id: user.user!.id, email: user.user!.email },
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
