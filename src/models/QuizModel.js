import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  statement: {
    type: String,
    required: true
  },
  alternatives: {
    type: [String],
    required: true
  },
  correctAnswerIndex: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: false
  }
}, { timestamps: false, versionKey: false, _id: false });

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  totalPrize: {
    type: Number,
    default: 100
  },
  questions: {
    type: [QuestionSchema],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
}, { timestamps: true, versionKey: false });

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;