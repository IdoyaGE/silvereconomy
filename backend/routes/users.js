import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";
import verifyToken from "../middleware/auth.js";
//Instancia del enrutador
const router = express.Router();

// Rutas GET para el middleware verifyToken y los controladores para obtener los users y los friends
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//Ruta PATCH que ejecuta el middleware verifyToken y el controlador de añadir y eliminar friends
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
