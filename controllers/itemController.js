const { lerArquivo, escreverArquivo } = require('../utils/fileUtils');
const path = require('path');

const filePath = path.join(__dirname, '../data/itensMagicos.json');

const TIPOS_VALIDOS = ['Arma', 'Armadura', 'Amuleto'];

function validarItem(item) {
    const { nome, tipo, forca, defesa } = item;

    if (!nome || !tipo) {
        return 'Nome e tipo são obrigatórios.';
    }

    if (!TIPOS_VALIDOS.includes(tipo)) {
        return 'Tipo inválido. Tipos válidos: Arma, Armadura, Amuleto.';
    }

    if (typeof forca !== 'number' || typeof defesa !== 'number') {
        return 'Força e Defesa devem ser números.';
    }

    if ((forca + defesa) === 0) {
        return 'Item não pode ter Força e Defesa zeradas.';
    }

    if (forca < 0 || defesa < 0 || forca > 10 || defesa > 10) {
        return 'Força e Defesa devem estar entre 0 e 10.';
    }

    if (tipo === 'Arma' && defesa !== 0) {
        return 'Itens do tipo Arma devem ter Defesa 0.';
    }

    if (tipo === 'Armadura' && forca !== 0) {
        return 'Itens do tipo Armadura devem ter Força 0.';
    }

    return null;
}

module.exports = {
    listarItens: async (req, res) => {
        const itens = await lerArquivo(filePath);
        res.json(itens);
    },

    buscarItem: async (req, res) => {
        const itens = await lerArquivo(filePath);
        const item = itens.find(i => i.id === req.params.id);
        if (!item) return res.status(404).json({ erro: 'Item não encontrado.' });
        res.json(item);
    },

    criarItem: async (req, res) => {
        const { nome, tipo, forca, defesa } = req.body;
        const erro = validarItem({ nome, tipo, forca, defesa });
        if (erro) return res.status(400).json({ erro });

        const itens = await lerArquivo(filePath);
        const novoItem = {
            id: Date.now().toString(),
            nome,
            tipo,
            forca,
            defesa
        };

        itens.push(novoItem);
        await escreverArquivo(filePath, itens);
        res.status(201).json(novoItem);
    },

    removerItem: async (req, res) => {
        const itens = await lerArquivo(filePath);
        const index = itens.findIndex(i => i.id === req.params.id);
        if (index === -1) return res.status(404).json({ erro: 'Item não encontrado.' });

        const removido = itens.splice(index, 1);
        await escreverArquivo(filePath, itens);
        res.json({ mensagem: 'Item removido com sucesso', removido });
    }
}