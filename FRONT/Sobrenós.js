// Adiciona um evento de escuta para quando o conteúdo do documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o elemento com a classe 'olá'
    const button = document.querySelector(".olá");
    
    // Seleciona o botão com a classe 'btn-default'
    const defaultButton = document.querySelector(".btn-default");

    // Obtém o valor armazenado no localStorage com a chave '@conta_conectada'
    const storedAccount = localStorage.getItem('@conta_conectada');

    // Verifica se há um valor armazenado
    if (storedAccount) {
        // Parseia o JSON para um objeto JavaScript
        const account = JSON.parse(storedAccount);
        
        // Acessa o nome da primeira conta no array
        const nome = account[0].name;

        // Verifica se o botão existe
        if (button) {
            // Exibe saudação com o nome do usuário
            button.textContent = `Olá, ${nome}`;
            
            // Adiciona um evento de escuta para quando o botão for clicado
            button.addEventListener('click', function() {
                // Redireciona para a página 'home.html'
                window.location.href = 'home.html';
            });
        }

        // Verifica se o botão padrão existe
        if (defaultButton) {
            // Oculta o botão "Faça Login"
            defaultButton.style.display = 'none';
        }

        // Cria um novo elemento de lista
        const saudacao = document.createElement('li');
        
        // Adiciona a classe 'nav-item' ao elemento
        saudacao.classList.add('nav-item');
        
        // Exibe saudação com o nome do usuário
        saudacao.textContent = `Olá, ${nome}`;

        // Seleciona a lista de navegação
        const navList = document.querySelector('#nav_list');

        // Verifica se a lista de navegação existe
        if (navList) {
            // Adiciona o elemento de saudação à lista de navegação
            navList.appendChild(saudacao);
        }

    } else {
        // Caso não esteja autenticado, manter o botão padrão
        if (button) {
            // Adiciona um evento de escuta para quando o botão for clicado
            button.addEventListener('click', function() {
                // Redireciona para a página 'login.html'
                window.location.href = 'login.html';
            });
        }
    }
});