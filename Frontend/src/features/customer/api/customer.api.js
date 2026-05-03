import {io} from "socket.io-client"

let socket;

export const connectSocket = ()=>{
    socket = io("http://localhost:8000",{
        withCredentials: true,
    })

    return socket
}

export const getSocket = ()=>{
    if(!socket) throw new Error("socket not initialized")
    return socket
}