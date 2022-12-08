import QuizHelper from "../helpers/QuizHelper.js";
import Answer from "../models/AnswerModel.js";
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
  },
  listByTeacher: async (req, res) => {
    const { teacherId } = req.params;
    try {
      const quizzes = await Quiz.find({ teacherId });
      let response = [];
      for (const quiz of quizzes) {
        const answerData = await Answer.aggregate([{ $match: { quizId: quiz._id } }, { $group: { _id: null, avgScore: { $avg: "$score" }, answerCount: { $sum: 1 } } }]);
        response = [...response, { ...quiz.toJSON(), avgScore: answerData[0]?.avgScore || 0, answerCount: answerData[0]?.answerCount || 0 }];
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: JSON.stringify(error) });
    }
  },
  listByPassword: async (req, res) => {
    const { password } = req.params;
    try {
      const quiz = await Quiz.find({ password }, { "questions.correctAnswerIndex": 0 });
      if (quiz.length) return res.status(200).json(quiz);
      return res.status(404).json({ error: "Not found." });
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  }
};

export default QuizController;