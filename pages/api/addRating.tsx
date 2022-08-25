import { addRating } from '../../lib/redis'

export default async function handler(req: any, res: any) {
    const data = await addRating();
    res.status(200).json(data)
}