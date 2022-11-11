import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import JwtHelper from "../helpers/JwtHelper.js";

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }, {}, { populate: ["password"] });
      if (!user) return res.status(400).json({ error: "Email ou senha incorretos." });

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) return res.status(400).json({ error: "Email ou senha incorretos." });

      const userJson = user.toJSON({ useProjection: true });

      const accessToken = JwtHelper.generateJwtToken(userJson, "10m");
      const refreshToken = JwtHelper.generateJwtToken(userJson, "3d");

      res.cookie("refreshToken", refreshToken, { httpOnly: false, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ user: userJson, accessToken });
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  },
  refreshToken: async (req, res) => {
    if (!req.cookies?.refreshToken) return res.status(401).json({ error: 'Unauthorized' });

    const refreshToken = req.cookies.refreshToken;

    jwt.verify(refreshToken, process.env.JWT_KEY, (error, decoded) => {
      if (error) return res.status(401).json({ error: 'Unauthorized' });

      const { _id, fullName, email, role, createdAt, updatedAt } = decoded;

      const accessToken = JwtHelper.generateJwtToken({
        _id, fullName, email, role, createdAt, updatedAt
      }, "10m");

      res.status(200).json({ accessToken });
    });
  }
};

export default AuthController;