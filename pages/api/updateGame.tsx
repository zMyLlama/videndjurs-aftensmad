import { updateGame } from '../../lib/redis'

export default async function handler(req: any, res: any) {
    const response = await updateGame(req.query);
    if (response.message === "OK") {
        res.status(200).json(response)
    } else {
        res.status(406).json(response)
    }
}