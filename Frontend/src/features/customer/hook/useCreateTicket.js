import { useState } from 'react'
import { createTicketAPI } from '../api/ticket.api'

export const useCreateTicket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitTicket = async ({ title, description }) => {
        // localStorage se businessId lo
        const savedBusiness = JSON.parse(localStorage.getItem('selectedBusiness') || 'null')
        const businessId = savedBusiness?.id

        if (!businessId) {
            setError('Pehle company select karo!')
            return null
        }

        setLoading(true)
        setError(null)

        try {
            const data = await createTicketAPI(businessId, { title, description })
            return data
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
            return null
        } finally {
            setLoading(false)
        }
    }

    return { submitTicket, loading, error }
}