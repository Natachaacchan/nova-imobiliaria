const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '18_Maeda',
  database: 'nova_imobiliaria'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

app.get('/dados', (req, res) => {
  const query = `
    SELECT 
        p.id_pagamento, 
        p.data_pagamento, 
        p.valor AS valor_do_pagamento, 
        i.id_imovel AS codigo_imovel, 
        i.descricao AS descricao_imovel, 
        t.descricao AS tipo_imovel
    FROM 
        pagamento p
    JOIN 
        imovel i ON p.imovel_id = i.id_imovel
    JOIN 
        tipo_imovel t ON i.tipo_imovel_id = t.id_tipo;
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
