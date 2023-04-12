import saveMessage from "../services/chatService.js";
import { Server } from "socket.io";

export function getIndex(req, res) {
  res.render("chat");
}

// Configuración de Socket.IO
export default function initSocketIO(server) {
  // const io = require("socket.io")(server);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

    socket.on("chat message", async (msg) => {
      console.log("Mensaje recibido:", msg);
      await saveMessage(msg.user, msg.text);
      io.emit("chat message", msg);
    });
  });
}
