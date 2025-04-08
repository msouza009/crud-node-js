const express = require('express');
const server = express();
server.listen(3000);

server.get('/characters', (req, res) => {
    return res.json({message: 'teste-route'});
})