// Seleciona os elementos de senha e confirmação de senha no documento
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");

// Função que valida se as senhas são iguais
function validatePassword() {
  // Verifica se o valor da senha é diferente do valor da confirmação de senha
  if (password.value !== confirmPassword.value) {
    // Se as senhas forem diferentes, define uma mensagem de erro personalizada
    confirmPassword.setCustomValidity("As senhas não coincidem");
  } else {
    // Caso contrário, remove a mensagem de erro
    confirmPassword.setCustomValidity('');
  }
}

// Define a função validatePassword para ser chamada quando o campo de senha mudar
password.onchange = validatePassword;

// Define a função validatePassword para ser chamada quando o campo de confirmação de senha for digitado
confirmPassword.onkeyup = validatePassword;

// Seleciona o botão com o id "button-avancar"
let button = document.getElementById("button-avancar");

// Adiciona um evento de clique ao botão
button.onclick = async function(event) {
  // Impede o comportamento padrão do botão (enviar o formulário)
  event.preventDefault();

  // Chama a função de validação de senha para garantir que as senhas sejam comparadas
  validatePassword();

  // Verifica novamente se as senhas não coincidem
  if (password.value !== confirmPassword.value) {
    // Exibe um alerta se as senhas forem diferentes
    alert("As senhas não coincidem!");
    return;
  }

  // Obtém os valores dos campos de nome, email e senha
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let passwordValue = document.getElementById("password").value;

  // Cria um objeto com os dados do formulário
  let data = {name, email, password: passwordValue};

  // Faz uma requisição POST para enviar os dados ao servidor
  const response = await fetch('http://localhost:3008/api/store/task', {
    method: "POST", // Método HTTP POST
    headers: {"Content-type": "application/json;charset=UTF-8"}, // Define o tipo de conteúdo como JSON
    body: JSON.stringify(data) // Converte os dados do objeto para uma string JSON
  });

  // Aguarda a resposta do servidor e a converte em JSON
  let content = await response.json();

  // Verifica se a resposta contém a propriedade 'success' com valor true
  if (content.success) {
    // Exibe uma mensagem de sucesso e redireciona para a página de login
    alert(content.message);
    window.location.href = 'login.html';
  } else {
    // Exibe uma mensagem de erro
    alert(content.message);
  }
}
