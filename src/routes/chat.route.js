import { Router } from "express";
const router = Router();

// Controlador de la página de chat
import { getIndex } from "../controllers/chatControllers.js";

// Página principal del chat
router.get("/", getIndex);

export default router;
