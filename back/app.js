import { Server } from "socket.io";

const io = new Server(8080, {
  cors: {
    origin: ["http://localhost:3000"]
  }
})

io.on("connection", (socket) => {
  // send a message to the client
  console.log(socket.id)

  // receive a message from the client
  socket.on("create-room", room => {
    socket.join(room)
  });

  socket.on("leave-room", room => {
    socket.leave(room)
  })
});