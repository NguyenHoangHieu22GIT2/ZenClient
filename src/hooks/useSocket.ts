import { useUserStore } from "@/lib/useUserStore";
import { Socket, io } from "socket.io-client";

export function useSocket() {
  const userId = useUserStore(state => state.user._id)
  let socketConversations: Socket = io("http://localhost:3001");
  let socketNotifications: Socket = io("http://localhost:3001");
  if (userId) {
    socketConversations = io("http://localhost:3001/conversations", {
    }).connect();

    socketNotifications = io("http://localhost:3001/notifications", {}).connect();
    socketNotifications.emit("check-connection", { userId: userId })
  }
}
