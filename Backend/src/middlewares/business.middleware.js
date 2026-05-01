import jwt from 'jsonwebtoken'
import { config } from '../config/config'

export const authenticateBusiness = (req,res,next) => {
    const token = req.cookies.token
    if(!token) return res.status(403).json({message:"Invalid token"})

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            console.log(error)
        }
}

