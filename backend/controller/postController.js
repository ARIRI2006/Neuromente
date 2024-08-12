const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeTask(request, response) {
  
  const params = Array(
    request.body.nome,
    request.body.relato,
    request.body.imagem
  );

  const query = 'INSERT INTO relato(name, relato, imagem) VALUES(?, ?, ?)';

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
async function getpost(request, response){
    const query = "SELECT * FROM post"
}

module.exports = {
  storepost
}