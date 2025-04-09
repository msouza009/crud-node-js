const fs = require('fs');
const Personagem = require('../models/Personagem');
const path = './data/personagens.json';

function salvar(personagem) {
    const personagens = listarTodos();
    personagens.push(personagem);
    personagens.push(personagem);
    fs.writeFileSync(path, JSON.stringify(personagens, null, 2));
}

function listarTodos() {
    if (!fs.existsSync(path)) return [];
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}