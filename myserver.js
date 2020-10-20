const io = require("socket.io")(3000);

const chatids = {};

io.on("connection", (socket) => {
  socket.on("new-chatid", (name) => {
    chatids[socketid] = name;
    socket.broadcast.emit("chatid-connected", name);
  });
  socket.on("send-chat-messge", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: chatids[socket.id],
    });
    socket.on("disconnect", () => {
      socket.broadcast.emit("chatid-disconnected", chatids[socket.id]);
    });
  });
});
