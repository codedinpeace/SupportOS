const jwt = require('jsonwebtoken')

const generateToken = (userId, res,next) => {
    try {
        if(!token){
            const err = new Error('invalid credentials for token creation')
            err.status = 401
            return next()
        }
            const token = jwt.sign(userId, process.env.JWT_SECRET)
            res.cookie('token', token)
    } catch (error) {
        const err = error
        err.status = 400
        next()
    }
}

module.exports = generateToken