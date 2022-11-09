import QuizHelper from "../helpers/QuizHelper.js";
import Quiz from "../models/QuizModel.js";

const QuizController = {
  create: async (req, res) => {
    const { title, description, expiryDate, questions, teacherId } = req.body;
    const password = QuizHelper.generatePassword();
    try {
      const quiz = new Quiz({ title, description, expiryDate, questions, password, teacherId });
      await quiz.save();
      res.status(200).json(quiz.toJSON());
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  }
};

export default QuizController;