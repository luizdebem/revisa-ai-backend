import express from "express";
import authRouter from "./AuthRouter.js";
import userRouter from "./UserRouter.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json({ uptime: process.uptime() });
});

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.get("*", (req, res) => res.status(404).send('<h1>404 Not Found</h1>'));

export default router;