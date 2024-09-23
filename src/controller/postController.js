// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');

// Carrega as variáveis de ambiente do arquivo .env
const dotenv = require('dotenv').config();

// Função assíncrona que armazena um novo relato no banco de dados
async function storepost(request, response) {
  
  // Extrai os dados do corpo da requisição e os coloca em um array
  const params = Array(
    request.body.nome,   // Nome da pessoa que postou o relato
    request.body.relato, // O conteúdo do relato
    request.body.imagem  // O URL ou caminho da imagem associada ao relato (se houver)
  );

  // Query SQL para inserir um novo relato na tabela 'post'
  const query = 'INSERT INTO post(nome, relato, imagem) VALUES(?, ?, ?)';

  // Executa a query SQL, passando a query e os parâmetros
  connection.query(query, params, (err, results) => {
    if(results) {  // Se a query for bem-sucedida
      // Envia uma resposta de sucesso com status 201 e uma mensagem de sucesso
      response
        .status(201)
        .json({
          success: true,
          message: 'Relato postado com sucesso!',
          data: results  // Inclui os resultados da operação na resposta
        })
    } else {  // Se ocorrer um erro na query
      console.log(query, params, results)  // Loga a query, os parâmetros e os resultados para depuração
      // Envia uma resposta de erro com status 400 e uma mensagem de erro
      response
      .status(400)
      .json({
        success: false,
        message: 'Erro',  // Mensagem genérica de erro
        data: err  // Inclui os detalhes do erro na resposta
      })
    }
  })
}

// Função assíncrona que recupera os relatos do banco de dados com suporte para paginação
async function getpost(request, response) {
  // Obtém a página solicitada a partir da query string ou define como 1 se não for especificada
  const page = parseInt(request.query.page) || 1;

  // Define o número de relatos por página (limite)
  const limit = 3;

  // Calcula o offset, que é o número de registros a serem ignorados com base na página atual
  const offset = (page - 1) * limit;

  // Query SQL para selecionar os relatos, ordenados pela data de criação em ordem decrescente, com limite e offset
  const query = `
    SELECT * 
    FROM post
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset};
  `;

  // Executa a query SQL para obter os relatos
  connection.query(query, (err, results) => {
    if (results) {  // Se a query for bem-sucedida
      // Envia uma resposta de sucesso com status 201 e os relatos recuperados
      response
        .status(201)
        .json({
          success: true,
          message: `Posts da página ${page} recuperados com sucesso`,  // Mensagem de sucesso com o número da página
          data: results  // Inclui os resultados da query (relatos) na resposta
        });
    } else {  // Se ocorrer um erro na query
      console.error('Erro na consulta SQL:', err);  // Loga o erro para depuração

      // Envia uma resposta de erro com status 400 e uma mensagem de erro
      response
        .status(400)
        .json({
          success: false,
          message: 'Erro ao recuperar posts',  // Mensagem genérica de erro
          data: err  // Inclui os detalhes do erro na resposta
        });
    }
  });
}

// Exporta as funções `storepost` e `getpost` para que possam ser utilizadas em outras partes da aplicação
module.exports = {
  storepost,
  getpost
}
