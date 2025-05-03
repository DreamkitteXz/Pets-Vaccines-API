require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRoutes = require('./routes/authRoutes');
const vacinaRoutes = require('./routes/vacinaRoutes');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para JSON
app.use(express.json());

// Rotas da API
app.use('/api', authRoutes);
app.use('/api/vacinas', vacinaRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
