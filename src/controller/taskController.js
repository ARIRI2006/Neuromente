const connection = require('../config/db'); // Importa a conexão com o banco de dados
const dotenv = require('dotenv').config(); // Carrega variáveis de ambiente

/**
 * @function storeTask
 * Cadastra uma nova tarefa no banco de dados.
 * 
 * @param {Object} request - Objeto da requisição HTTP.
 * @param {Object} response - Objeto da resposta HTTP.
 */
async function storeTask(request, response) {
  try {
    // Obtém os dados do corpo da requisição
    const { name, email, password } = request.body;

    // Validação básica de entrada
    if (!name || !email || !password) {
      return response.status(400).json({
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios!',
      });
    }

    // Query SQL e parâmetros
    const query = 'INSERT INTO cadastro (name, email, password) VALUES (?, ?, ?)';
    const params = [name, email, password];

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
      if (err) {
        // Erro ao executar a query
        return response.status(500).json({
          success: false,
          message: 'Erro ao salvar a tarefa no banco de dados.',
          error: err.message, // Inclui a mensagem de erro para depuração
        });
      }

      // Resposta de sucesso
      return response.status(201).json({
        success: true,
        message: 'Conta criada com sucesso!',
        data: results,
      });
    });
  } catch (error) {
    // Captura erros inesperados
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro no servidor.',
      error: error.message, // Inclui a mensagem de erro para depuração
    });
  }
}

module.exports = {
  storeTask,
};
