
// Seleciona o botão com a classe 'olá'
const button = document.querySelector(".olá");

// Seleciona o botão com a classe 'btn-default'
const defaultButton = document.querySelector(".btn-default");

// Recupera a conta armazenada no localStorage, se existir
const storedAccount = localStorage.getItem('@conta_conectada');

if (storedAccount) {
    // Converte a string JSON da conta armazenada para um objeto JavaScript
    const account = JSON.parse(storedAccount);
    
    // Acessa o nome da primeira conta no array
    const nome = account[0].name;

    // Se o botão com a classe 'olá' existir
    if (button) {
        // Altera o texto do botão para 'Olá, [nome]'
        button.textContent = `Olá, ${nome}`;
        
        // Adiciona um evento de clique que redireciona para a página 'home.html'
        button.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // Oculta o botão com a classe 'btn-default'
    if (defaultButton) {
        defaultButton.style.display = 'none';
    }

} else {
    // Se a conta não estiver armazenada (não autenticado)
    if (button) {
        // Adiciona um evento de clique que redireciona para a página de login
        button.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

// Executa o código quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há uma conta autenticada no localStorage
    const authenticated = localStorage.getItem('@conta_conectada');
    
    // Seleciona todos os links de navegação com a classe 'nav-link'
    const links = document.querySelectorAll('#nav_list .nav-link');

    // Se não houver uma conta autenticada
    if (!authenticated) {
        // Desabilita todos os links de navegação e adiciona um evento de clique
        links.forEach(link => {
            // Adiciona a classe 'disabled-link' para desabilitar o link
            link.classList.add('disabled-link');
            
            // Adiciona um evento de clique que impede a navegação
            link.addEventListener('click', function(event) {
                event.preventDefault();
                // Redireciona o usuário para a página de login
                window.location.href = 'login.html';
            });
        });
    }
});
