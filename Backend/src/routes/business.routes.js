import express from 'express'
import { businessRegisterValidator } from '../validators/auth.validator.js'
import { businessLogin, businessRegister, inviteAgents, verifyEmail, logoutBusiness } from '../controllers/business.controllers.js'
import { authenticateBusiness } from '../middlewares/business.middleware.js'

const businessRouter = express.Router()

businessRouter.post('/register', businessRegisterValidator,  businessRegister)
businessRouter.get('/verify-email', verifyEmail)
businessRouter.post('/login', businessLogin)
businessRouter.post('/invite-agent', authenticateBusiness, inviteAgents)
businessRouter.post('/logout', logoutBusiness)

export default businessRouter