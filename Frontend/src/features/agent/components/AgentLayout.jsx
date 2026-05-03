import { Outlet } from 'react-router-dom'

import useAuthStore from '../../../store/auth.store'
import { SocketProvider } from '../../../shared/context/SocketContext'

const AgentLayout = () => {
    const { user } = useAuthStore()
    const businessId = user?.businessId

    return (
        <SocketProvider businessId={businessId}>
            <Outlet />
        </SocketProvider>
    )
}

export default AgentLayout