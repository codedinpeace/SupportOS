import { useState, useEffect } from 'react'
import { getAllTicketsAPI } from '../api/ticket.api.js'

export const useGetTickets = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getAllTicketsAPI()
                setTickets(data.tickets)
            } catch (err) {
                setError(err.response?.data?.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [])

    return { tickets, loading, error }
}