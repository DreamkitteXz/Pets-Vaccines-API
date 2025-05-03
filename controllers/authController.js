const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    // Verifica se usuário já existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    // Cria novo usuário com senha criptografada
    const senhaHash = await bcrypt.hash(senha, 10);
    usuario = new Usuario({ nome, email, senha: senhaHash });
    await usuario.save();
    // Gera token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro de usuário' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    // Compara senha informada com hash armazenado
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }
    // Gera token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
  }
};
