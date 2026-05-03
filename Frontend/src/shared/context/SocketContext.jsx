import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children, businessId }) => {
    const [notifications, setNotifications] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
    if(!businessId) return
    
    const newSocket = io('http://localhost:8000/', { 
        withCredentials: true,
        transports: ['websocket']
    })

    newSocket.on('connect', () => {
        console.log('socket connected:', newSocket.id)
        newSocket.emit('join:business', businessId)
    })

    newSocket.on('new:ticket', (ticket) => {
        console.log('🎫 ticket received:', ticket)
        setNotifications(prev => [ticket, ...prev])
    })

    setSocket(newSocket)
    return () => newSocket.disconnect()
}, [businessId])

    return (
        <SocketContext.Provider value={{ notifications, setNotifications, socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}
