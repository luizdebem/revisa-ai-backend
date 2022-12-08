import express from "express";
import QuizController from "../controllers/QuizController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const quizRouter = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/',
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      return callback(null, fileName);
    }
  })
});

quizRouter.post("/", AuthMiddleware, QuizController.create);
quizRouter.post("/upload", upload.single('image'), QuizController.uploadFile);
quizRouter.get("/:password", QuizController.listByPassword);
quizRouter.get("/teacher/:teacherId", QuizController.listByTeacher);

export default quizRouter;