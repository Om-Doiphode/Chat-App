const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const connectToMongo = require("./db");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const PORT = process.env.PORT || 5000;
const router = require("./router");

connectToMongo();

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      romm: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(`room: ${user.room}`);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
  });
});

// Middleware
app.use(express.json());
// GET method route
app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

app.use(router);
server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
app.use("/api/auth", require("./routes/auth"));
