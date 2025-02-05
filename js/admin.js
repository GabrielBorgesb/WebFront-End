// Carregar dados do Local Storage ao iniciar
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para salvar no Local Storage
function salvarLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Função para renderizar a lista
function renderizarLista() {
    const list = document.getElementById('userList');
    list.innerHTML = usuarios.map((usuario, index) => `
        <div class="user-item">
            <span>${new Date(usuario.data).toLocaleString()} - 
            ${usuario.nome} - ${usuario.email}</span>
            <button onclick="excluirItem(${index})">✖</button>
        </div>
    `).join('');
}

// Formulário de submissão
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const novoUsuario = {
        data: new Date().toISOString(),
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };
    
    usuarios.push(novoUsuario);
    salvarLocalStorage();
    renderizarLista();
    this.reset();
});

// Excluir item específico
function excluirItem(index) {
    usuarios.splice(index, 1);
    salvarLocalStorage();
    renderizarLista();
}

// Excluir todos os itens
function excluirTodos() {
    if(confirm('Tem certeza que deseja excluir todos os usuários?')) {
        usuarios = [];
        salvarLocalStorage();
        renderizarLista();
    }
}

// Pesquisar itens
document.getElementById('searchInput').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    const resultados = usuarios.filter(usuario => 
        usuario.nome.toLowerCase().includes(termo) || 
        usuario.email.toLowerCase().includes(termo)
    );
    
    document.getElementById('userList').innerHTML = resultados.map((usuario, index) => `
        <div class="user-item">
            <span>${new Date(usuario.data).toLocaleString()} - 
            ${usuario.nome} - ${usuario.email}</span>
            <button onclick="excluirItem(${index})">✖</button>
        </div>
    `).join('');
});

// Limpar campos do formulário
function limparCampos() {
    document.getElementById('userForm').reset();
}

// Renderizar lista inicial
renderizarLista();