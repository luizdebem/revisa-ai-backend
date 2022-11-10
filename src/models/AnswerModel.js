import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  quizId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  answers: {
    type: [Number],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  prizeEarned: {
    type: Number,
    required: true
  }
}, { timestamps: true, versionKey: false });

const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;