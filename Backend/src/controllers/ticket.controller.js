import ticketModel from "../models/ticket.model.js"

export const createTicket = async (req,res) => {
    try {
        const userId = req.user.id
        const {businessId} = req.params   
        const {title, description} = req.body

        const ticket = await ticketModel.create({
            title,
            description,
            status:'open',
            businessId:businessId,
            userId,
            assignedAgentId:null,
        }) 

        res.status(201).json({message:'Ticket created successfully', ticket})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getAllTickets = async (req,res) => {
    try {
        const tickets = await ticketModel.find({userId:req.user.id})
        res.status(200).json({tickets})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteTicket = async (req,res)=>{
    try {
        const {ticketid} = req.params
        const deletedTicket = await ticketModel.findOneAndDelete({_id:ticketid})
        res.status(200).json({message:'ticket deleted successfully', deletedTicket})
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
}

export const deleteAll = async (req,res)=>{
    try {
        const {userId} = req.params
        const tickets = await ticketModel.deleteMany({userId})
        res.status(200).json({message:'All tickets deleted', tickets})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const acceptTicket = async (req,res) =>{
    try {
        const {ticketid} = req.params
        const ticket = await ticketModel.findOneAndUpdate({_id:ticketid}, {assignedAgentId:req.agent.id, status:'in-progress'}, {new:true})

        res.status(200).json({message:'ticket accepted'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
