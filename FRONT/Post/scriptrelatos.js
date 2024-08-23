const addRelatoBtn = document.getElementById('add-relato-btn');
const relatoFormContainer = document.getElementById('relato-form-container');
const relatoForm = document.getElementById('RelatoForm');
const relatosContainer = document.getElementById('relatos-container');

addRelatoBtn.addEventListener('click', () => {
    relatoFormContainer.classList.toggle('show');
});

relatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const relato = document.getElementById('relato').value;
    const imagem = document.getElementById('imagem').files[0];

    const data = {
        nome,
        relato,
        imagem
    }

    const response = await fetch(`http://localhost:3008/api/store/post`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      });
  
      let content = await response.json();
  
      if (content.success) {
        alert(content.message);
      } else {
        alert(content.message);
      }
});







let currentPage = 1;  // Página inicial

document.addEventListener('DOMContentLoaded', () => {
    loadPosts(currentPage);

    document.getElementById('loadMoreButton').addEventListener('click', () => {
        currentPage++;  // Incrementa a página
        loadPosts(currentPage);
    });
});

async function loadPosts(page) {
    const response = await fetch(`http://localhost:3008/api/store/getpost?page=${page}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    });

    let content = await response.json();

    if (content.success) {
        const postContainer = document.getElementById('postContainer');
        content.data.forEach(post => {
            const article = document.createElement('article');
            
            const h1 = document.createElement('h1');
            h1.textContent = post.nome;  // Substitua 'title' pelo nome correto da propriedade do título

            const h2 = document.createElement('h2');
            h2.textContent = post.relato;  // Substitua 'subtitle' pelo nome correto da propriedade do subtítulo

            article.appendChild(h1);
            article.appendChild(h2);
            postContainer.appendChild(article);
        });
    } else {
        alert(content.message);
    }
}
