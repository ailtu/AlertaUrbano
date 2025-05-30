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
