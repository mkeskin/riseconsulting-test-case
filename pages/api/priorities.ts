import type { NextApiRequest, NextApiResponse } from 'next'
import { priorities } from '../../server'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof priorities>
) {
  res.status(200).json(priorities)
}
