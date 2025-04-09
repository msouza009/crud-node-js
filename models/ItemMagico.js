class ItemMagico {
    constructor(id, nome, tipo, forca, defesa) {
      this.id = id;
      this.nome = nome;
      this.tipo = tipo;
  
      if (!['Arma', 'Armadura', 'Amuleto'].includes(tipo)) {
        throw new Error('Tipo inválido.');
      }
  
      if (forca === 0 && defesa === 0) {
        throw new Error('Item deve ter pelo menos força ou defesa maior que 0.');
      }
  
      if (tipo === 'Arma') defesa = 0;
      if (tipo === 'Armadura') forca = 0;
  
      this.forca = forca;
      this.defesa = defesa;
    }
  }
  
  module.exports = ItemMagico;
  