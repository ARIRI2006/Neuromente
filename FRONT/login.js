// Seleciona o botão com o id "button-avancar"
let button = document.querySelector("#button-avancar");

// Adiciona um evento de clique ao botão
button.onclick = async function(event) {
  // Impede o comportamento padrão do botão (enviar o formulário)
  event.preventDefault();

  // Obtém os valores dos campos de email e senha
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  // Cria um objeto com os dados de email e senha
  let data = {email, password};

  // Faz uma requisição POST para o servidor com os dados do login
  const response = await fetch('http://localhost:3008/api/store/logintask', {
    method: "POST", // Método HTTP POST
    headers: {"Content-type": "application/json;charset=UTF-8"}, // Define o tipo de conteúdo como JSON
    body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON
  });
  
  // Aguarda a resposta do servidor e a converte para JSON
  let content = await response.json();
  
  // Verifica se a resposta contém a propriedade 'success' com valor true
  if (content.success) {
    // Redireciona o usuário para a página 'home.html' se o login for bem-sucedido
    window.location.href = './home.html';
    
    // Armazena os dados do usuário logado no localStorage do navegador
    localStorage.setItem('@conta_conectada', JSON.stringify(content.data));
    
    // Exibe uma mensagem de sucesso
    alert(content.message);
  } else {
    // Exibe uma mensagem de erro caso o login falhe
    alert(content.message); 
  }  
}
