// Configurar conexão Parse
Parse.initialize("SiuHdXCJvobgElteggFHLxlYV4VicWVCcTSiz7WQ", "88HJimRgUagRxpL6Z88QM2oKTAJMRiruyUr0VzPm");
Parse.serverURL = "https://parseapi.back4app.com/";

async function carregarReports() {
  const listEl = document.getElementById("report-list");
  listEl.innerHTML = "";

  try {
    const Report = Parse.Object.extend("Report");
    const query = new Parse.Query(Report);
    query.descending("createdAt");
    const results = await query.find();

    if (results.length === 0) {
      listEl.innerHTML = "<p>Nenhum report encontrado.</p>";
      return;
    }

    results.forEach(report => {
      const tipo = report.get("tipo");
      const titulo = report.get("titulo");
      const descricao = report.get("descricao");
      const data = new Date(report.get("createdAt")).toLocaleString("pt-BR");

      const item = document.createElement("div");
      item.className = "report-item";
      item.innerHTML = `
        <h3>${titulo}</h3>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><small>${data}</small></p>
      `;
      listEl.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao carregar reports:", error);
    listEl.innerHTML = "<p>Erro ao buscar reports. Verifique sua conexão.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarReports);
