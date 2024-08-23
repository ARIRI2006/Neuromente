const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storepost(request, response) {
  
  const params = Array(
    request.body.nome,
    request.body.relato,
    request.body.imagem
  );

  const query = 'INSERT INTO post(nome, relato, imagem) VALUES(?, ?, ?)';

  connection.query(query, params, (err, results) => {
    if(results) {
      response
        .status(201)
        .json({
          success: true,
          message: 'Relato postado com sucesso!',
          data: results
        })
    } else {
      console.log(query, params, results)
      response
      .status(400)
      .json({
        success: false,
        message: 'Erro',
        data: err
      })
    }
  })
}


async function getpost(request, response) {
  const page = parseInt(request.query.page) || 1;  // Pega a página da query string
  const limit = 3;  // Número de posts por página
  const offset = (page - 1) * limit;  // Calcula o offset

  const query = `
    SELECT * 
    FROM post
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset};
  `;

  connection.query(query, (err, results) => {
    if (results) {
      response
        .status(201)
        .json({
          success: true,
          message: `Posts da página ${page} recuperados com sucesso`,
          data: results
        });
    } else {
      console.error('Erro na consulta SQL:', err);

      response
        .status(400)
        .json({
          success: false,
          message: 'Erro ao recuperar posts',
          data: err
        });
    }
  });
}


module.exports = {
  storepost,
  getpost
}