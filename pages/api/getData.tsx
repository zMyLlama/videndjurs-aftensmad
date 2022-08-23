import { getData } from '../../lib/redis'

export default async function handler(req: any, res: any) {
    const data = await getData();
    res.status(200).json(data)
}