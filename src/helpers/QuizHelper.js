import randtoken from "rand-token";
const numGenerator = randtoken.generator({ chars: "numeric" });
const charGenerator = randtoken.generator({ chars: "ALPHA"});

const QuizHelper = {
  // Exemplo: ABC123
  generatePassword: () => {
    const chars = charGenerator.generate(3);
    const nums = numGenerator.generate(3);
    return `${chars}${nums}`;
  }
};

export default QuizHelper;