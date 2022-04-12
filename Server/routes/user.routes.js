import { Router } from "express";
import { signin, signup } from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.post("/signin", signin);
userRoutes.post("/signup", signup);
