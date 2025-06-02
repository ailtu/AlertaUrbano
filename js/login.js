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
