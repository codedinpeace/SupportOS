import jwt from 'jsonwebtoken'
import { config } from '../config/config'

export const authenticateAgent = (req,res,next) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, config.JWT_SECRET)
        res.agent = decoded
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
