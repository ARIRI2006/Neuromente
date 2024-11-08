// Seleciona o botão para adicionar relato
const addRelatoBtn = document.getElementById('add-relato-btn');
// Seleciona o container do formulário de relatos
const relatoFormContainer = document.getElementById('relato-form-container');
// Seleciona o formulário de relatos
const relatoForm = document.getElementById('RelatoForm');

// Evento de clique no botão de adicionar relato para mostrar/esconder o formulário
addRelatoBtn.addEventListener('click', () => {
    // Verifica se o formulário está visível
    if (relatoFormContainer.style.display === 'none' || relatoFormContainer.style.display === '') {
        relatoFormContainer.style.display = 'block';  // Exibe o formulário
    } else {
        relatoFormContainer.style.display = 'none';  // Esconde o formulário
    }
});

// Evento de submissão do formulário para enviar o relato ao servidor
relatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita o comportamento padrão de recarregar a página

    // Obtém os valores dos campos de nome e relato
    const nome = document.getElementById('nome').value;
    const relato = document.getElementById('relato').value;

    // Cria um objeto com os dados do relato
    const data = {
        nome,
        relato,
    };

    // Envia os dados do relato ao servidor usando o método POST
    const response = await fetch(`http://localhost:3008/api/store/post`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    // Converte a resposta para JSON
    let content = await response.json();

    // Exibe uma mensagem ao usuário com base na resposta do servidor
    if (content.success) {
        alert(content.message);
    } else {
        alert(content.message);
    }
});

// Variável para acompanhar a página atual dos relatos
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Carrega os relatos da primeira página ao carregar o DOM
    loadPosts(currentPage);

    // Evento de clique para carregar mais relatos ao clicar no botão "Ler mais"
    document.getElementById('loadMoreButton').addEventListener('click', () => {
        currentPage++;  // Incrementa o número da página
        loadPosts(currentPage);  // Carrega a próxima página de relatos
    });
});

// Função para carregar relatos do servidor
async function loadPosts(page) {
    const response = await fetch(`http://localhost:3008/api/store/getpost?page=${page}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    });

    let content = await response.json();

    // Se a resposta for bem-sucedida, adiciona os relatos ao container de posts
    if (content.success) {
        const postContainer = document.getElementById('postContainer');
        content.data.forEach(post => {
            const article = document.createElement('article');

            const h1 = document.createElement('h1');
            h1.textContent = post.nome;  // Nome do autor do relato

            const h2 = document.createElement('h2');
            h2.textContent = post.relato;  // Texto do relato

            article.appendChild(h1);
            article.appendChild(h2);
            postContainer.appendChild(article);
        });
    } else {
        alert(content.message);
    }
}

// Evento para verificar se o usuário está autenticado e alterar a interface de acordo
document.addEventListener('DOMContentLoaded', function() {
    const defaultButton = document.querySelector(".btn-default"); // Botão de login padrão

    // Verifica se há uma conta conectada no localStorage
    const storedAccount = localStorage.getItem('@conta_conectada');
    if (storedAccount) {
        const account = JSON.parse(storedAccount); // Converte a string JSON em objeto
        const nome = account[0].name; // Obtém o nome do usuário

        // Se o botão de saudação existir, muda o texto para "Olá, [nome]"
        const button = document.querySelector(".olá");
        if (button) {
            button.textContent = `Olá, ${nome}`;
            button.addEventListener('click', function() {
                window.location.href = 'home.html';
            });
        }

        // Esconde o botão "Faça Login"
        if (defaultButton) {
            defaultButton.style.display = 'none';
        }

        // Injeta uma saudação personalizada no menu de navegação
        const saudacao = document.createElement('li');
        saudacao.classList.add('nav-item');
        saudacao.textContent = `Olá, ${nome}`;
        const navList = document.querySelector('#nav_list');
        if (navList) {
            navList.appendChild(saudacao);
        }

    } else {
        // Se não estiver autenticado, o botão padrão leva para a página de login
        const button = document.querySelector(".olá");
        if (button) {
            button.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }
});

