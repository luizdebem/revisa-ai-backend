import express from "express";
import AnswerController from "../controllers/AnswerController.js";

const answerRouter = express.Router();

answerRouter.post("/", AnswerController.create);

export default answerRouter;