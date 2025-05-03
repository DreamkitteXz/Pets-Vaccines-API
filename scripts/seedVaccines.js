// scripts/seedVaccines.js
require('dotenv').config();
const mongoose = require('mongoose');
const Vacina = require('../models/Vacina');

const vacinas = [
  {
    nome: 'Vacina Antirrábica',
    descricao: 'Previne raiva em cães, gatos e outros mamíferos.',
    especiesAlvo: ['Cão', 'Gato']
  },
  {
    nome: 'V8/V10 Polivalente',
    descricao: 'Protege contra cinomose, hepatite, parvovirose, adenovírus tipo 2, parainfluenza e leptospirose.',
    especiesAlvo: ['Cão']
  },
  {
    nome: 'Vacina Polivalente de Gatos (RCP)',
    descricao: 'Combina rinotraqueíte, calicivirose e panleucopenia felina.',
    especiesAlvo: ['Gato']
  },
  {
    nome: 'Vacina Contra Leptospirose',
    descricao: 'Protege contra principais sorovares de leptospira em cães.',
    especiesAlvo: ['Cão']
  }
  // …adicione quantas vacinas quiser
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');
    await Vacina.deleteMany();             // limpa coleção
    await Vacina.insertMany(vacinas);      // insere as vacinas
    console.log('Seed concluído!');
    process.exit(0);
  } catch (err) {
    console.error('Erro no seed:', err);
    process.exit(1);
  }
};

seed();
