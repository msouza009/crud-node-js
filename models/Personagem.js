class Personagem {
    constructor(id, nome, nomeAventureiro, classe, level, forca, defesa) {
        if (!['Guerreiro', 'Mago', 'Arqueiro', 'Ladino', 'Bardo'].includes(classe)) {
            throw new Error('Classe inválida');
        }
        if (forca + defesa > 10) {
            throw new Error('A soma de força e defesa não pode ser maior que 10');
        }

        this.id = id;
        this.nome = nome;
        this.nomeAventureiro = nomeAventureiro;
        this.classe = classe;
        this.level = level;
        this.itensMagicos = [];
        this.forcaBase = forca;
        this.defesaBase = defesa;
    }

    getForcaTotal() {
        return this.forcaBase + this.itensMagicos.reduce((acc, item) => acc + item.forca, 0);
    }

    getDefesaTotal() {
        return this.defesaBase + this.itensMagicos.reduce((acc, item) => acc + item.defesa, 0);
    }

    adicionarItem(item) {
        if (item.tipo === 'Amuleto' && this.itensMagicos.some(i => i.tipo === 'Amuleto')) {
            throw new Error('Só é permitido 1 Amuleto por personagem.');
        }
        this.itensMagicos.push(item);
    }

    removerItem(itemId) {
        this.itensMagicos = this.itensMagicos.filter(i => i.id !== itemId);
    }

    static fromJSON(json) {
        const p = new Personagem(
            json.id,
            json.nome,
            json.nomeAventureiro,
            json.classe,
            json.level,
            json.forcaBase,
            json.defesaBase
        );
        p.itensMagicos = json.itensMagicos || [];
        return p;
    }
}

module.exports = Personagem;
