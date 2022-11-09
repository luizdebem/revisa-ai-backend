import express from "express";
import QuizController from "../controllers/QuizController.js";

const quizRouter = express.Router();

quizRouter.post("/", QuizController.create);

export default quizRouter;