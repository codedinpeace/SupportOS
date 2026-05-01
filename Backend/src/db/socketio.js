import { Server } from 'socket.io';
import Anthropic from '@anthropic-ai/sdk'; // ✅ fixed

const client = new Anthropic();

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

                const stream = await client.messages.stream({
                    model: 'claude-sonnet-4-5',
                    max_tokens: 1024,
                    messages,
                });

                for await (const chunk of stream) {
                    if (
                        chunk.type === 'content_block_delta' &&
                        chunk.delta.type === 'text_delta'
                    ) {
                        socket.emit('ai:chunk', { text: chunk.delta.text });
                    }
                }

                const final = await stream.finalMessage();
                socket.emit('ai:done', { usage: final.usage });

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