document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password: senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login realizado com sucesso!");
      window.location.href = "/pages/home.html";
    } else {
      alert("Erro: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
});
