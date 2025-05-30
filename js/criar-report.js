const cepInput = document.getElementById('cep');
const erroCep = document.getElementById('erro-cep');

cepInput.addEventListener('input', () => {
    const apenasNumeros = /^\d*$/;
    if (!apenasNumeros.test(cepInput.value)) {
        erroCep.style.display = 'block';
    } else {
        erroCep.style.display = 'none';
    }
});
