const { lerArquivo, escreverArquivo } = require('../utils/fileUtils');
const ItemMagico = require('../models/ItemMagico');

const FILE = 'data/itensMagicos.json';

async function getAllItens() {
  return await lerArquivo(FILE);
}

async function getItemById(id) {
  const itens = await lerArquivo(FILE);
  return itens.find((item) => String(item.id) === String(id));
}

async function createItem(itemData) {
  const itens = await lerArquivo(FILE);
  const novoItem = new ItemMagico(Date.now().toString(), itemData.nome, itemData.tipo, itemData.forca, itemData.defesa);
  itens.push(novoItem);
  await escreverArquivo(FILE, itens);
  return novoItem;
}

async function deleteItem(id) {
  let itens = await lerArquivo(FILE);
  const index = itens.findIndex((item) => String(item.id) === String(id));
  if (index === -1) return null;

  const removido = itens.splice(index, 1)[0];
  await escreverArquivo(FILE, itens);
  return removido;
}

module.exports = {
  getAllItens,
  getItemById,
  createItem,
  deleteItem,
};
