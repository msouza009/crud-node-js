const { lerArquivo } = require('../utils/fileUtils');

async function buscarItemPorId(id) {
  const itens = await lerArquivo('itensMagicos.json');
  return itens.find(i => i.id == id);
}

module.exports = { buscarItemPorId };
