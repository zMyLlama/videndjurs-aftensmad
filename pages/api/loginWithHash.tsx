import { loginWithHash } from '../../lib/accountServer'

export default async function handler(req: any, res: any) {
    const response = await loginWithHash(req.query);
    if (response.message === "OK") {
        res.status(200).json(response)
    } else {
        res.status(406).json(response)
    }
}