import express from "express";
import QuizController from "../controllers/QuizController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const quizRouter = express.Router();

quizRouter.post("/", AuthMiddleware, QuizController.create);

export default quizRouter;