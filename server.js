import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URI);

import express from "express";
import productRouter from "./src/routes/product.route.js";
import cartRouter from "./src/routes/cart.route.js";
import userRouter from "./src/routes/user.route.js";
import router from "./src/routes/chat.route.js";
import otherRouter from "./src/routes/other.route.js";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoStore from "connect-mongo";
import compression from "compression";
import minimist from "minimist";
import passport from "passport";
import logger from "./src/utils/loggers/Log4jsLogger.js";
import loggerMiddleware from "./src/middlewares/routesLogger.middleware.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
//const io = new IOServer(HttpServer);
//import { configureSocketIO } from "../socket/socketChat.js";
import initSocketIO from "./src/controllers/chatControllers.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(loggerMiddleware);
app.use(express.static("./public"));
// app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());
// app.set("views", "/src/views");
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

app.use(passport.initialize());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/src/views/layouts",
    partialsDir: __dirname + "/src/views/partials",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, //10 min.
  })
);

app.use(passport.session());

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/usuario", userRouter);
app.use("/api/chat", router);
app.use("/test", otherRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "ruta no existente" });
});

//Socket chat:
//socketIoChat(io);

/* --------------- Leer el puerto por consola o setear default -------------- */

const options = {
  alias: {
    p: "PORT",
  },
  default: {
    PORT: 8080,
  },
};

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

const { PORT } = minimist(process.argv.slice(2), options);

// const server = app.listen(PORT, () => {
//   logger.info(`🚀 Server started at http://localhost:${PORT}`);
// });

// server.on("error", (err) => logger.error(err));

const httpServer = app.listen(PORT, () => {
  logger.info(`🚀 Server started at http://localhost:${PORT}`);
});

initSocketIO(httpServer);
