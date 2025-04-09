# 💻 Atividade CRUD - RPG

## Funcionalidades:

- Cadastrar personagens
- Cadastrar itens mágicos
- Listar todos os personagens
- Buscar personagem por ID
- Atualizar o nome de um personagem
- Remover personagem
- Listar todos os itens mágicos
- Buscar item por ID
- Adicionar item a um personagem
- Listar os itens de um personagem
- Remover item de um personagem
- Buscar o amuleto de um personagem

##  Mapeamento das Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/characters` | Cadastrar personagem |
| `GET` | `/characters` | Listar todos os personagens |
| `GET` | `/characters/:id` | Buscar personagem por ID |
| `PUT` | `/characters/:id/nome` | Atualizar nome do personagem |
| `DELETE` | `/characters/:id` | Remover personagem |
| `POST` | `/characters/adicionar-item` | Adicionar item a um personagem |
| `GET` | `/characters/:id/itens` | Listar itens do personagem |
| `DELETE` | `/characters/:id/item/:itemId` | Remover item de um personagem |
| `GET` | `/characters/:id/amuleto` | Buscar amuleto do personagem |
| `POST` | `/items` | Cadastrar item mágico |
| `GET` | `/items` | Listar todos os itens mágicos |
| `GET` | `/items/:id` | Buscar item por ID |

---
[Link Problemática](https://docs.google.com/document/d/1IPlYEOGXp5hg_LFg4ZREwGyUdC_cULVCZSUc_ZpxXWg/edit?tab=t.0#heading=h.edmb2mwuhiq2)
---

## Passos para rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/msouza009/crud-node-js.git
2. Instale as dependências:
    ```bash
    npm install
3. Inicie o servidor:
    ```
    npm start