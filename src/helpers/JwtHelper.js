import jwt from "jsonwebtoken";

const JwtHelper = {
  generateJwtToken: (data, expiresIn) => {
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn });
  }
};

export default JwtHelper;