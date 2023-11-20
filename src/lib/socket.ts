import { Socket, io } from "socket.io-client";
import jsCookie from "js-cookie";
const userId = jsCookie.get("userId")
let socketUsers: Socket = io("http://localhost:3001/users", { query: { userId } }).connect()
let socketConversations: Socket = io("http://localhost:3001/conversations", { query: { userId } }).connect();
let socketNotifications: Socket = io("http://localhost:3001/notifications", { query: { userId } }).connect();
export { socketConversations, socketNotifications, socketUsers }



