import express from "express";
import AnswerController from "../controllers/AnswerController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const answerRouter = express.Router();

answerRouter.post("/", AuthMiddleware, AnswerController.create);
answerRouter.get("/:studentId", AuthMiddleware, AnswerController.findByStudentId);

export default answerRouter;