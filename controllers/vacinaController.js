const Vacina = require('../models/Vacina');

// Obtém todas as vacinas (público)
exports.getVacinas = async (req, res) => {
  try {
    const vacinas = await Vacina.find();
    res.json(vacinas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vacinas' });
  }
};

// Obtém uma vacina por ID (público)
exports.getVacinaById = async (req, res) => {
  try {
    const vacina = await Vacina.findById(req.params.id);
    if (!vacina) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    res.json(vacina);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vacina' });
  }
};

// Cria nova vacina (protegido)
exports.createVacina = async (req, res) => {
  try {
    const { nome, descricao, especiesAlvo } = req.body;
    const novaVacina = new Vacina({ nome, descricao, especiesAlvo });
    await novaVacina.save();
    res.status(201).json(novaVacina);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar vacina' });
  }
};

// Atualiza vacina existente (protegido)
exports.updateVacina = async (req, res) => {
  try {
    const { nome, descricao, especiesAlvo } = req.body;
    const vacinaAtualizada = await Vacina.findByIdAndUpdate(
      req.params.id,
      { nome, descricao, especiesAlvo },
      { new: true }
    );
    if (!vacinaAtualizada) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    res.json(vacinaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar vacina' });
  }
};

// Remove vacina (protegido)
exports.deleteVacina = async (req, res) => {
  try {
    const vacinaRemovida = await Vacina.findByIdAndDelete(req.params.id);
    if (!vacinaRemovida) {
      return res.status(404).json({ message: 'Vacina não encontrada' });
    }
    res.json({ message: 'Vacina removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover vacina' });
  }
};
