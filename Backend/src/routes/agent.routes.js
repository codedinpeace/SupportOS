import express from 'express'
import { agentRegister, agentLogin, getTickets, agentVerifyEmail, logoutAgent, agentCheck } from '../controllers/agent.controller.js'
import { authenticateAgent } from '../middlewares/agent.middleware.js'

const agentRouter = express.Router()

agentRouter.post('/register', agentRegister)
agentRouter.get('/verify-email', agentVerifyEmail)
agentRouter.post('/login', agentLogin)
agentRouter.get('/tickets', authenticateAgent, getTickets)         
agentRouter.get('/me', authenticateAgent, agentCheck)
agentRouter.post('/logout', logoutAgent)

export default agentRouter