import { Router } from "express";
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPostBySearch,
} from "../controllers/posts.controller.js";
import auth from "../middleware/auth.js";

export const postRoutes = Router();

postRoutes.get("/search", getPostBySearch);
postRoutes.get("/", getPosts);

postRoutes.post("/", auth, createPost);
postRoutes.patch("/:id", auth, updatePost);
postRoutes.delete("/:id", auth, deletePost);
postRoutes.patch("/:id/likePost", auth, likePost);
