import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import './app/App.css'
import { SocketProvider } from './shared/context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
