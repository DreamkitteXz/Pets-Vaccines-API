const express = require('express');
const { getVacinas, getVacinaById, createVacina, updateVacina, deleteVacina } = require('../controllers/vacinaController');
const auth = require('../middleware/auth');
const router = express.Router();

// Rotas de vacinas
router.get('/', getVacinas);
router.get('/:id', getVacinaById);
router.post('/', auth, createVacina);
router.put('/:id', auth, updateVacina);
router.delete('/:id', auth, deleteVacina);

module.exports = router;
