const mongoose = require('mongoose');

const vacinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  especiesAlvo: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vacina', vacinaSchema);
