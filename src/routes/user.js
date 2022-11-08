import express from "express";
import UserController from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/:id", UserController.show);
userRouter.patch("/:id", UserController.update);
userRouter.post("/", UserController.create);

export default userRouter;