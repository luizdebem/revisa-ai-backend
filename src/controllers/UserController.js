import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JwtHelper from "../helpers/JwtHelper.js";
import User from "../models/UserModel.js";

const UserController = {
  create: async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "E-mail já está em uso." });

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User({ fullName, email, password: encryptedPassword, role });
      await user.save();

      const userJson = user.toJSON({ useProjection: true });

      const accessToken = JwtHelper.generateJwtToken(userJson, "40m");
      const refreshToken = JwtHelper.generateJwtToken(userJson, "3d");

      res.cookie("refreshToken", refreshToken, { httpOnly: false, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ user: userJson, accessToken });
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID é obrigatório." })

    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json(user);

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID é obrigatório." });

    try {
      const user = await User.findByIdAndUpdate(id, { $set: req.body }, { lean: true, new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  }
};

export default UserController;