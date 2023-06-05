import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

/*LEER*/
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/*ACTUALIZAR*/
router.patch("/:id/like", verifyToken, likePost);

export default router;
