import express from 'express'
import { agentRegister, agentLogin, getTickets,agentVerifyEmail } from '../controllers/agent.controller.js'
import { authenticateAgent } from '../middlewares/agent.middleware.js'

const agentRouter = express.Router()

agentRouter.post('/register', agentRegister)
agentRouter.get('/verify-email', agentVerifyEmail)
agentRouter.post('/login', agentLogin)
agentRouter.get('/tickets', authenticateAgent, getTickets)         

export default agentRouter