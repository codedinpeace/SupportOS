import express from 'express'
import { acceptTicket, createTicket, deleteTicket, deleteAll, getAllTickets } from '../controllers/ticket.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { authenticateAgent } from '../middlewares/agent.middleware.js'
const ticketRouter = express.Router()

ticketRouter.post('/create-ticket/:businessId', authenticateUser, createTicket)
ticketRouter.delete('/delete-ticket/:ticketid', authenticateUser,  deleteTicket)
ticketRouter.delete('/delete-ticket/:userId', authenticateUser, deleteAll)
ticketRouter.patch('/accept-ticket/:ticketid', authenticateAgent, acceptTicket)
ticketRouter.get('/all-tickets/:ticketid', authenticateUser, getAllTickets)

export default ticketRouter