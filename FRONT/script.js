$(document).ready(function() {
    $('#mobile_btn').on('click', function (){
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});

const button = document.querySelector(".olá");
const defaultButton = document.querySelector(".btn-default"); // Seleciona o botão com a classe 'btn-default'

const storedAccount = localStorage.getItem('@conta_conectada');
if (storedAccount) {
    const account = JSON.parse(storedAccount); // Parseia o JSON para um objeto JavaScript
    const nome = account[0].name; // Acessa o nome da primeira conta no array

    if (button) {
        button.textContent = `Olá, ${nome}`;
        button.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // Oculta o botão com a classe 'btn-default'
    if (defaultButton) {
        defaultButton.style.display = 'none';
    }

} else {
    if (button) {
        button.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const authenticated = localStorage.getItem('@conta_conectada');
    const links = document.querySelectorAll('#nav_list .nav-link');

    if (!authenticated) {
        // Se não estiver autenticado, desabilita os links e adiciona um evento de clique
        links.forEach(link => {
            link.classList.add('disabled-link');
            link.addEventListener('click', function(event) {
                event.preventDefault();
                // Redireciona para a página de login
                window.location.href = 'login.html';
            });
        });
    }
});