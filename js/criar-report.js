// Validar CEP
function configurarValidadorDeCep() {
    const cepInput = document.getElementById('cep');
    const erroCep = document.getElementById('erro-cep');

    cepInput.addEventListener('input', () => {
        const apenasNumeros = /^\d*$/;
        erroCep.style.display = apenasNumeros.test(cepInput.value) ? 'none' : 'block';
    });
}

// Enviar o report
document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const titulo = document.getElementById('titulo').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const descricao = document.getElementById('descricao').value;
    
    const reportData = {
        title: titulo,
        description: descricao,
        location: `${endereco}, ${numero} - CEP: ${cep} [${tipo}]`
    };

    try {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Report enviado com sucesso!');
            window.location.href = 'home.html';
        } else {
            alert(`Erro: ${data.error}`);
        }
    } catch (error) {
        console.error(error);
        alert('Erro de conexão com o servidor.');
    }
});

window.addEventListener('DOMContentLoaded', configurarValidadorDeCep);