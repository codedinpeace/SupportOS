import { Server } from 'socket.io';
import Groq from "groq-sdk";
import {config} from "../config/config.js"

const client = new Groq({
    apiKey: config.GROQ_API_KEY,
});

let io;

export const initSocketServer = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    });

    console.log('Socket Server Active');

    io.on('connection', (socket) => {
        console.log('User connected: ' + socket.id);

        socket.on('user:message', async ({ messages }) => {
            try {
                socket.emit('ai:start');

                const stream = await client.chat.completions.create({
                    model: "mixtral-8x7b-32768",
                    messages,
                    stream: true,
                });

                for await (const chunk of stream) {
                    const text = chunk.choices?.[0]?.delta?.content;

                    if (text) {
                        socket.emit('ai:chunk', { text });
                    }
                }

                socket.emit('ai:done');

            } catch (err) {
                console.error('AI stream error:', err);
                socket.emit('ai:error', { message: err.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected: ' + socket.id);
        });
    });
};

export function getIo() {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
}
