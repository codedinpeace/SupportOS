import express from 'express'
import { businessRegisterValidator } from '../validators/auth.validator.js'
import { businessRegister } from '../controllers/business.controllers.js'

const businessRouter = express.Router()

businessRouter.post('/register', businessRegisterValidator,  businessRegister)

export default businessRouter