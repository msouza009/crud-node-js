const path = require('path');
const { lerArquivo, escreverArquivo } = require('../utils/fileUtils');
const Personagem = require('../models/Personagem');
const { getItemById } = require('../services/itemService');

const FILE = path.join(__dirname, '../data/personagens.json');

async function listarPersonagens(req, res) {
  const personagens = await lerArquivo(FILE);
  res.json(personagens);
}

async function buscarPersonagem(req, res) {
  const personagens = await lerArquivo(FILE);
  const personagem = personagens.find(p => p.id == req.params.id);
  if (!personagem) return res.status(404).json({ erro: 'Personagem não encontrado' });
  res.json(personagem);
}

async function criarPersonagem(req, res) {
  try {
    const { nome, nomeAventureiro, classe, level, forca, defesa } = req.body;
    const personagens = await lerArquivo(FILE);
    const id = personagens.length + 1;
    const novo = new Personagem(id, nome, nomeAventureiro, classe, level, forca, defesa);
    personagens.push(novo);
    await escreverArquivo(FILE, personagens);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function atualizarNome(req, res) {
  const personagens = await lerArquivo(FILE);
  const personagem = personagens.find(p => p.id == req.params.id);
  if (!personagem) return res.status(404).json({ erro: 'Personagem não encontrado' });
  personagem.nome = req.body.nome;
  await escreverArquivo(FILE, personagens);
  res.json(personagem);
}

async function removerPersonagem(req, res) {
  let personagens = await lerArquivo(FILE);
  personagens = personagens.filter(p => p.id != req.params.id);
  await escreverArquivo(FILE, personagens);
  res.status(204).send();
}

async function adicionarItemAoPersonagem(req, res) {
  const { personagemId, itemId } = req.body;
  const personagens = await lerArquivo(FILE);
  const personagem = personagens.find(p => p.id == personagemId);
  if (!personagem) return res.status(404).json({ erro: 'Personagem não encontrado' });

  const item = await getItemById(itemId);
  if (!item) return res.status(404).json({ erro: 'Item não encontrado' });

  try {
    const personagemObj = Personagem.fromJSON(personagem);
    personagemObj.itens = personagem.itens || [];
    personagemObj.adicionarItem(item);
    personagem.itens = personagemObj.itens;

    await escreverArquivo(FILE, personagens);
    res.json(personagem);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = {
  listarPersonagens,
  buscarPersonagem,
  criarPersonagem,
  atualizarNome,
  removerPersonagem,
  adicionarItemAoPersonagem
};
