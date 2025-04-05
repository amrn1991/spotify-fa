import { validateRoute } from '@/lib/auth'

export async function GET(req: Request, res: Response) {
  const result = await validateRoute()

  return Response.json({ result })
}