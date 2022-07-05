import { Server } from "socket.io";

const io = new Server(8080, {
  cors: {
    origin: ["http://localhost:3000"]
  }
})

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on("room-request", (room, playerTurn) => {
    let isRoom = io.sockets.adapter.rooms.has(room)
    if (playerTurn) isRoom = !isRoom
    if (isRoom) {
      socket.join(room)
      socket.emit("valid-room", room)
    } else {
      playerTurn
        ?socket.emit('error', "Sorry this room already exists.")
        :socket.emit('error', "Sorry this room doesn't exist.")
    }

    if (isRoom && !playerTurn) {
      io.to(room).emit('start-game')
    }
  });

  socket.on("leave-room", room => {
    socket.leave(room)
  })

  socket.on("client-ready", room => {
    console.log(socket.id)
    socket.broadcast.to(room).emit("check-ready", socket.id)
  })

  socket.on("start-battle", room => {
    io.to(room).emit('battle-begin')
  })
});