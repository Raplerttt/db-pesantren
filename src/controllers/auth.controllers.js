// src/controllers/auth.controller.js
const authService = require('../services/auth.services');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser({ email, password });
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
