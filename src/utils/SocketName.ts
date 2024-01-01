export const socketNameEmit = {
  joinChatRoom: "joinChatRoom",
  exitChatRoom: "exitChatRoom",
  sendMessage: "sendMessage",
  joinAllChatRoom: "joinAllChatRoom",
  seeMessages: "seeMessages",
  connect: "connect"
} as const;

export const socketNameOn = {
  receiveMessage: "receiveMessage",
} as const;
