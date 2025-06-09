function configurarValidadorDeCep() {
    const cepInput = document.getElementById('cep');
    const erroCep = document.getElementById('erro-cep');
  
    cepInput.addEventListener('input', () => {
      const apenasNumeros = /^\d*$/;
      erroCep.style.display = apenasNumeros.test(cepInput.value) ? 'none' : 'block';
    });
  }
  

document.querySelector('.form-report').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const titulo = document.getElementById('titulo').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const cep = document.getElementById('cep').value;
    const descricao = document.getElementById('descricao').value;

    const reportData = {
        tipo,
        titulo,
        endereco,
        numero: parseInt(numero),
        cep,
        descricao,
        data: new Date().toISOString()
    };

    // 1. Salvar localmente no localStorage
    let reportsLocal = JSON.parse(localStorage.getItem('reports')) || [];
    reportsLocal.push(reportData);
    localStorage.setItem('reports', JSON.stringify(reportsLocal));

    // 2. Tentar salvar no backend (Parse)
    const Report = Parse.Object.extend("Report");
    const report = new Report();

    Object.entries(reportData).forEach(([key, value]) => {
        report.set(key, value);
    });

    try {
        await report.save();
        console.log("Report salvo no backend com sucesso.");
    } catch (error) {
        console.warn("Falha ao salvar no backend, mantendo apenas local:", error.message);
    }

    alert("Report enviado com sucesso!");

    // 3. Redirecionar para a tela home
    window.location.href = "home.html";
});

window.addEventListener('DOMContentLoaded', () => {
    configurarValidadorDeCep();
  
    // Aqui você pode adicionar outras coisas que precisam ser feitas quando a página carregar
  });
  