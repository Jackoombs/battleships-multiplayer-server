import { Server } from "socket.io";

const io = new Server(process.env.PORT || 8080 , {
  cors: {
    origin: ["https://jackoombs.github.io"],
    methods: ["GET", "POST"],
    credentials: true
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
    socket.broadcast.to(room).emit("check-ready")
  })

  socket.on("start-battle", room => {
    io.to(room).emit('battle-begin')
  })

  socket.on("send-fire", (room, tile) => {
    socket.broadcast.to(room).emit("receive-fire", tile)
  })

  socket.on("send-turn-result", (room, tile, isHit, isSunk) => {
    io.to(room).emit("receive-turn-result", tile, isHit, isSunk)
  })

  socket.on("send-winner", room => {
    io.to(room).emit("receive-winner")
  })

  socket.on("send-play-again", room => {
    console.log("working")
    socket.broadcast.to(room).emit("check-play-again")
  })

  socket.on("send-restart-game", room => {
    io.to(room).emit("restart-game")
  })
});