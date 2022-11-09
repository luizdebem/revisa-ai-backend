import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.get("/:id", AuthMiddleware, UserController.show);
userRouter.patch("/:id", AuthMiddleware, UserController.update);
userRouter.post("/", UserController.create);

export default userRouter;