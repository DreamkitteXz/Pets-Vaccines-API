// scripts/seed-vacinas-mongodb-client.js
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
// Exemplo de MONGO_URI no .env:
// MONGO_URI="mongodb+srv://pets4408:minhaSenha@cluster0.fmzhhnz.mongodb.net/vacinaspets?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Defina aqui o array de vacinas que deseja inserir
const vacinas = [
  {
    nome: 'Vacina Antirrábica',
    descricao: 'Previne a raiva em cães, gatos e outros mamíferos.',
    especiesAlvo: ['Cão', 'Gato'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nome: 'V8 Polivalente',
    descricao: 'Protege contra cinomose, hepatite, parvovirose, adenovírus tipo 2 e parainfluenza.',
    especiesAlvo: ['Cão'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nome: 'Vacina RCP Felino',
    descricao: 'Combina rinotraqueíte, calicivirose e panleucopenia felina.',
    especiesAlvo: ['Gato'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // …adicione quantas vacinas quiser
];

async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso!");

    // Selecione o banco e a coleção
    const db = client.db('vacinaspets');
    const col = db.collection('vacinas');

    // 1) Limpa a coleção (opcional)
    await col.deleteMany({});
    console.log('Coleção “vacinas” limpa.');

    // 2) Insere o array de vacinas
    const result = await col.insertMany(vacinas);
    console.log(`Inseridas ${result.insertedCount} vacinas.`);
  } catch (err) {
    console.error('Erro ao popular o banco:', err);
  } finally {
    await client.close();
    console.log('Conexão encerrada.');
  }
}

run().catch(console.dir);
