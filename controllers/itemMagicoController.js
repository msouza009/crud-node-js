const path = require('path');
const { lerArquivo, escreverArquivo } = require('../utils/fileUtils');
const ItemMagico = require('../models/ItemMagico');

const FILE = path.join(__dirname, '../data/itensMagicos.json');

async function listarItens(req, res) {
  const itens = await lerArquivo(FILE);
  res.json(itens);
}

async function buscarItem(req, res) {
  const itens = await lerArquivo(FILE);
  const item = itens.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ erro: 'Item não encontrado' });
  res.json(item);
}

async function criarItem(req, res) {
  try {
    const { nome, tipo, forca, defesa } = req.body;
    const itens = await lerArquivo(FILE);
    const id = itens.length + 1;
    const novo = new ItemMagico(id, nome, tipo, forca, defesa);
    itens.push(novo);
    await escreverArquivo(FILE, itens);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { listarItens, buscarItem, criarItem };
