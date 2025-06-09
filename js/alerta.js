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

function loadLeaflet(callback) {
    // Verifica se o Leaflet já foi carregado
    if (typeof L !== 'undefined') {
        callback();
        return;
    }

    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletScript.onload = callback;
    document.body.appendChild(leafletScript);
}


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

document.addEventListener('DOMContentLoaded', () => {
    // outras funções e listeners aqui...

    loadLeaflet(() => {
        const map = L.map('map').setView([-8.055456, -34.888452], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);

        let marker;

        function buscarLocal() {
            const place = document.getElementById('search-input').value;
            const resultsDiv = document.getElementById('search-results');
            resultsDiv.innerHTML = '';

            if (!place) {
                alert('Digite um lugar!');
                return;
            }

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
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
                })
                .catch(error => {
                    console.error('Erro na busca:', error);
                    alert('Erro ao buscar local.');
                });
        }

        document.getElementById('search-btn').addEventListener('click', buscarLocal);
        document.getElementById('search-input').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                buscarLocal();
            }
        });
    });
});
