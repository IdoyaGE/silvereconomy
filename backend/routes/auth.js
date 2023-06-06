import express from "express";
import { login } from "../controllers/auth.js";
//Instancia para definir la ruta de tipo POST de registro
const router = express.Router();

router.post("/login", login);
//esportamos el enrutador
export default router;
