import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useStore from "./useStore";

export default function useSocket() {
  const socketRef = useRef(null);
  const token = useStore((s) => s.token);
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const setOnlineUsers = useStore((s) => s.setOnlineUsers);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const socketUrl = import.meta.env.VITE_API_URL || window.location.origin;
    const socket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("presence:update", (users) => {
      setOnlineUsers(users);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, token, setOnlineUsers]);

  return socketRef;
}
