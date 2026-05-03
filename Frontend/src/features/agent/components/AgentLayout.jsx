import { Outlet } from 'react-router-dom'

import useAuthStore from '../../../store/auth.store'
import { SocketProvider } from '../../../shared/context/SocketContext'

const AgentLayout = () => {
    const { agent } = useAuthStore()
    const businessId = agent?.businessId

    return (
        <SocketProvider businessId={businessId}>
            <Outlet />
        </SocketProvider>
    )
}

export default AgentLayout