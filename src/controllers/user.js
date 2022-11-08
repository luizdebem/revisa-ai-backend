import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const UserController = {
  create: async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "E-mail já está em uso." });

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = new User({ fullName, email, password: encryptedPassword, role });
      await user.save();

      jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1d" }, (error, token) => {
        if (error) throw error;
        res.status(200).json({ user, token });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID é obrigatório." })

    try {
      const user = await User.findById(id, { password: 0 });
      if (!user) return res.status(404).json(user);

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID é obrigatório." })

    try {
      const user = await User.findByIdAndUpdate(id, { $set: req.body }, { lean: true, new: true, projection: { password: 0 } });
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

export default UserController;