import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Keep an array of socket ids for each user to support multiple connections per user
export const getReciverSocketIds = (reciverId) => {
  return userSocketMap[reciverId] || [];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const userId = socket.handshake.query.userId;

  // store multiple socket ids per user
  if (userId && userId !== "undefined") {
    if (!userSocketMap[userId]) userSocketMap[userId] = [];
    // avoid duplicates
    if (!userSocketMap[userId].includes(socket.id)) userSocketMap[userId].push(socket.id);
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap)); //[1,2,3,4]

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if (userId && userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter((id) => id !== socket.id);
      if (userSocketMap[userId].length === 0) delete userSocketMap[userId];
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { io, server, app };
