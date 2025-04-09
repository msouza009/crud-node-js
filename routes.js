const express = require('express');
const router = express.Router();

const personagemController = require('./controllers/personagemController');
const itemController = require('./controllers/itemController');

router.get('/characters', personagemController.listarPersonagens);
router.get('/characters/:id', personagemController.buscarPersonagem);
router.post('/characters', personagemController.criarPersonagem);
router.put('/characters/:id/nome', personagemController.atualizarNome);
router.delete('/characters/:id', personagemController.removerPersonagem);
router.post('/characters/adicionar-item', personagemController.adicionarItemAoPersonagem);

router.get('/items', itemController.listarItens);
router.get('/items/:id', itemController.buscarItem);
router.post('/items', itemController.criarItem);
router.delete('/items/:id', itemController.removerItem);

module.exports = router;
