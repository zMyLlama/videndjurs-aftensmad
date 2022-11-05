import { login } from '../../lib/accountServer'

export default async function handler(req: any, res: any) {
    const response = await login(JSON.parse(req.body));
    if (response.status === true) {
        res.status(201).json(response)
    } else {
        res.status(403).json(response)
    }
}