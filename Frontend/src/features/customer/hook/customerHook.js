import { useEffect, useState, useCallback, useRef } from "react";
import { connectSocket, getSocket } from "../api/customer.api"


export const useChatSocket = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  
  // Use a ref to track the current socket instance
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = connectSocket();
    const socket = socketRef.current;

    socket.on("ai:start", () => {
      setIsTyping(true);
      setError(null);
    });

    socket.on("ai:chunk", ({ text }) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.role === "assistant") {
          // Update the last message content
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, content: lastMsg.content + text }
          ];
        }
        return prev;
      });
    });

    socket.on("ai:done", () => setIsTyping(false));

    socket.on("ai:error", ({ message }) => {
      setError(message);
      setIsTyping(false);
    });

    return () => {
      socket.off("ai:start");
      socket.off("ai:chunk");
      socket.off("ai:done");
      socket.off("ai:error");
    };
  }, []);

  const sendMessage = useCallback((text) => {
    const socket = socketRef.current || getSocket();
    if (!socket) return;

    const userMsg = { id: Date.now(), role: "user", content: text };
    const aiPlaceholder = { id: Date.now() + 1, role: "assistant", content: "" };

    // Update UI first
    setMessages((prev) => {
      const newList = [...prev, userMsg, aiPlaceholder];
      
      // Emit after state derivation but outside the setter if possible
      // or map directly from the new list
      const history = newList.map(({ role, content }) => ({ role, content }));
      socket.emit("user:message", { messages: history });
      
      return newList;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setError(null);
  }, []);

  return { messages, sendMessage, clearMessages, isTyping, error };
};