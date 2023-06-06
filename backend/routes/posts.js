import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import verifyToken from "../middleware/auth.js";
//Instancia del enrutador
const router = express.Router();

//Rutas GET que ejecutan el middleware verifyToken y los controladores getFeedPost y getUserPosts
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
//Ruta PATCH para los likes de los posts
router.patch("/:id/like", verifyToken, likePost);

export default router;
