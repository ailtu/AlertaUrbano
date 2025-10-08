// inicializa o mapa
const map = L.map('map').setView([-8.055456, -34.888452], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

let marker; // marcador de busca

// Buscar locais usando Nominatim
async function buscarLocal() {
    const place = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';

    if (!place) {
        alert('Digite um lugar!');
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
        const data = await response.json();

        if (data.length > 0) {
            data.slice(0, 5).forEach((item) => {
                const option = document.createElement('div');
                option.textContent = item.display_name;

                option.addEventListener('click', function () {
                    const lat = item.lat;
                    const lon = item.lon;

                    map.setView([lat, lon], 13);

                    if (marker) {
                        map.removeLayer(marker);
                    }

                    marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(item.display_name)
                        .openPopup();

                    resultsDiv.innerHTML = '';
                });

                resultsDiv.appendChild(option);
            });
        } else {
            resultsDiv.innerHTML = '<div>Nenhum resultado encontrado.</div>';
        }
    } catch (error) {
        console.error('Erro na busca:', error);
        alert('Erro ao buscar local.');
    }
}

document.getElementById('search-btn').addEventListener('click', buscarLocal);
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscarLocal();
    }
});

async function carregarReportsAtivos() {
    try {
        const response = await fetch('/api/reports'); // rota do backend
        const reports = await response.json();

        reports.forEach(report => {
            L.marker([report.latitude, report.longitude])
                .addTo(map)
                .bindPopup(`<b>${report.titulo}</b><br>${report.descricao}`);
        });

    } catch (error) {
        console.error('Erro ao carregar reports:', error);
    }
}

// Chama ao carregar a página
carregarReportsAtivos();
