const addRelatoBtn = document.getElementById('add-relato-btn');
const relatoFormContainer = document.getElementById('relato-form-container');
const relatoForm = document.getElementById('RelatoForm');
const relatosContainer = document.getElementById('relatos-container');

addRelatoBtn.addEventListener('click', () => {
    relatoFormContainer.classList.toggle('show');
});

relatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const relato = document.getElementById('relato').value;
    const imagem = document.getElementById('imagem').files[0];

    // Enviar dados para o banco de dados
    // ...

    // Criar elemento de relato
    const relatoElement = document.createElement('div');
    relatoElement.className = 'relato-item';

    const img = document.createElement('img');
    img.src = URL.createObjectURL(imagem);
    relatoElement.appendChild(img);

    const relatoText = document.createElement('div');
    relatoText.className = 'relato-text';

    const h3 = document.createElement('h3');
    h3.textContent = nome;
    relatoText.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = relato;
    relatoText.appendChild(p);

    relatoElement.appendChild(relatoText);

    relatosContainer.appendChild(relatoElement);

    // Limpar formulário
    relatoForm.reset();
    relatoFormContainer.classList.remove('show');
});