import express from 'express'
import { acceptTicket, createTicket, deleteTicket, deleteAll, getAllTickets } from '../controllers/ticket.controller'
import { authenticateUser } from '../middlewares/auth.middleware'
import { authenticateAgent } from '../middlewares/agent.middleware'
const ticketRouter = express.Router()

ticketRouter.post('/create-ticket/:businessId', authenticateUser, createTicket)
ticketRouter.delete('/delete-ticket/:ticketid', authenticateUser,  deleteTicket)
ticketRouter.deleteAll('/delete-ticket/:userId', authenticateUser, deleteAll)
ticketRouter.patch('/accept-ticket/:ticketid', authenticateAgent, acceptTicket)
ticketRouter.get('/all-tickets/:ticketid', authenticateUser, getAllTickets)

export default ticketRouter