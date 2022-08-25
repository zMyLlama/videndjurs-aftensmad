import { addRating } from '../../lib/redis'

export default async function handler(req: any, res: any) {
    const response = await addRating(req.body);
    res.status(200).json(response)
}