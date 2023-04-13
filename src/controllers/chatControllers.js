import saveMessage from "../services/chatService.js";
import { Server } from "socket.io";

const message = { user: "pepe", text: "hola" };

export function getIndex(req, res) {
  res.render("chat", { message });
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

    socket.on("message", async (msg) => {
      console.log("Mensaje recibido:", msg);
      await saveMessage(msg.user, msg.text);
      io.emit("message", msg);
    });
  });
}
