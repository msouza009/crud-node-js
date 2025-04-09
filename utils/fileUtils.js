const fs = require('fs').promises;

async function lerArquivo(caminho) {
    try {
        const dados = await fs.readFile(caminho, 'utf-8');
        return JSON.parse(dados);
    } catch (err) {
        return [];
    }
}

async function escreverArquivo(caminho, dados) {
    await fs.writeFile(caminho, JSON.stringify(dados, null, 2));
}

module.exports = {
    lerArquivo,
    escreverArquivo
  };
  