# # 📌 Alerta Urbano

Em diversas cidades brasileiras — sobretudo em centros urbanos como o Recife —, 
problemas cotidianos como buracos nas vias, acúmulo de lixo, enchentes e árvores 
caídas são frequentemente ignorados ou levam muito tempo para serem solucionados 
pelos órgãos competentes.

Esse cenário inspirou o desenvolvimento do **Alerta Urbano**, um aplicativo web e 
mobile que permite aos cidadãos registrarem e consultarem ocorrências urbanas em 
tempo real.

O objetivo central do projeto é criar uma ponte entre a população e os setores 
responsáveis pela infraestrutura urbana, facilitando a denúncia, a visualização e, 
futuramente, a resposta a esses problemas.

---

## 🚀 Links Úteis:

- Acesse o projeto pelo Github Pages:
[Clique aqui!](https://ailtu.github.io/AlertaUrbano/)
Status: Estável 🚀


- Acesse o projeto pelo Vercel:
[Clique aqui!](https://alerta-urbano-ebon.vercel.app)
Status: Sob atenção‼️


- Clone o repositório
git clone https://github.com/ailtu/AlertaUrbano.git

---

## 🚀 Tecnologias Utilizadas:

- ✅ HTML
- ✅ CSS
- ✅ JavaScript
- ✅ Node.js
- ✅ Back4App
- ✅ Supabase

---

## 📚 Documentação

> Nesta seção estão detalhados alguns trechos relevantes do código que compõe a aplicação Alerta Urbano.

### 🔐Configuração do Back4App

```javascript
Parse.initialize("SiuHdXCJvobgElteggFHLxlYV4VicWVCcTSiz7WQ", "88HJimRgUagRxpL6Z88QM2oKTAJMRiruyUr0VzPm");
Parse.serverURL = "https://parseapi.back4app.com/";
```

### 🔐 Exemplo: Função de Login com Supabase

```javascript
async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return;  // Para a execução aqui
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert('Erro: ' + error.message);
    } else {
        alert('Login bem-sucedido!');
        document.querySelector('.btn-login').innerText = 'Logado!';
    }
}

```

Esta função login realiza a autenticação do usuário utilizando o serviço de autenticação da Supabase.
Ela começa capturando os valores dos campos de e-mail e senha do formulário e realizando uma limpeza com .trim() para evitar espaços desnecessários.
Se algum dos campos estiver vazio, um alerta é exibido e a função retorna imediatamente.
Em seguida, é feita uma chamada assíncrona ao supabase.auth.signInWithPassword, passando os dados fornecidos.
Caso haja erro, ele é tratado com uma mensagem de alerta amigável para o usuário.
Se o login for bem-sucedido, uma mensagem de sucesso é exibida e o botão de login tem seu texto alterado para indicar o status de “Logado!”.

---

### 🧭 Exemplo: Geração Dinâmica de Submenu de Categorias

```javascript
const submenu = document.getElementById('submenu');
const submenuTitle = document.getElementById('submenu-title');
const submenuOptions = document.getElementById('submenu-options');

const categories = {
    transito: ['Acidente', 'Buracos na via', 'Congestionamento', 'Estacionamento irregular', 'Faixa Interditada'],
    energia: ['Queda de energia', 'Fio exposto', 'Curto circuito'],
    enchente: ['Alagamento', 'Risco de enchente'],
    infraestrutura: ['Obra na via', 'Faixa interditada', 'Buracos'],
    arvore: ['Árvore caída', 'Risco de queda'],
    lixo: ['Lixo acumulado', 'Descarte irregular']
};

// Abrir submenu
document.querySelectorAll('.alert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        const options = categories[type];

        submenuTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        submenuOptions.innerHTML = '';

        options.forEach(opcao => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = 'criar-report.html';
            link.textContent = opcao;
            link.classList.add('submenu-item');
            li.appendChild(link);
            submenuOptions.appendChild(li);
        });

        submenu.style.display = 'block';
    });
});

// Fechar submenu clicando fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.alert-btn') && !e.target.closest('.submenu')) {
        submenu.style.display = 'none';
    }
});
```

Este trecho de código é responsável por exibir dinamicamente um submenu com categorias de ocorrências urbanas quando o usuário clica em um botão correspondente.
categories: objeto que agrupa os tipos de problemas urbanos (como trânsito, energia, lixo etc.) e suas subcategorias.
Ao clicar em um botão .alert-btn, o sistema:
Identifica o tipo de ocorrência através do atributo data-type.
Atualiza o título do submenu com o nome da categoria clicada.
Limpa as opções anteriores e gera dinamicamente os itens (li > a) com os nomes das subcategorias, levando para a página criar-report.html ao serem clicadas.
Um eventListener global é adicionado para fechar o submenu automaticamente quando o usuário clica fora dele, aumentando a usabilidade da interface.
