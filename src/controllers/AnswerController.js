import Answer from "../models/AnswerModel.js";
import Quiz from "../models/QuizModel.js";

const AnswerController = {
  create: async (req, res) => {
    const { studentId, quizId, answers } = req.body;

    try {
      const quiz = await Quiz.findById(quizId);

      const { score, prizeEarned } = calculateScoreAndPrize(quiz, answers);

      const answer = new Answer({ studentId, quizId, answers, score, prizeEarned });
      await answer.save();

      return res.status(200).json(answer.toJSON());
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  },
  findByStudentId: async (req, res) => {
    const { studentId } = req.params;
    try {
      const answers = await Answer.find({ studentId });
      return res.status(200).json([...answers]);
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  }
};

function calculateScoreAndPrize(quiz, answers) {
  let totalRightAnswers = 0;

  for (let i = 0; i < quiz.questions.length; i++) {
    if (answers[i] === quiz.questions[i].correctAnswerIndex) totalRightAnswers++;
  }

  const studentSuccessRatio = (totalRightAnswers / quiz.questions.length);

  const score = parseFloat((studentSuccessRatio * 10).toFixed(1));
  const prizeEarned = parseFloat((studentSuccessRatio * quiz.totalPrize).toFixed(2));

  return { score, prizeEarned };
}

export default AnswerController;