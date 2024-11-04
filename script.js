let qrCodes = [];
let currentIndex = 0;
let intervalId = null;

// Inicializar la aplicación
window.onload = initializeQRCodes;

// Simular datos de QR
function initializeQRCodes() {
    for (let i = 1; i <= 15; i++) {
        qrCodes.push({
            id: `F14-00${i}`,
            data: `Location data for F14-00${i}`
        });
    }
    renderQRGrid();
}

// Renderizar grid de QRs
function renderQRGrid() {
    const grid = document.getElementById('qrGrid');
    grid.innerHTML = '';
    
    qrCodes.forEach(qr => {
        const div = document.createElement('div');
        div.className = 'qr-item';
        
        const qrDiv = document.createElement('div');
        new QRCode(qrDiv, {
            text: qr.data,
            width: 100,
            height: 100
        });
        
        const label = document.createElement('div');
        label.className = 'qr-label';
        label.textContent = qr.id;
        
        div.appendChild(qrDiv);
        div.appendChild(label);
        grid.appendChild(div);
    });
}

// Mostrar ubicación actual
function showLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const locationInfo = document.getElementById('locationInfo');
            locationInfo.innerHTML = `
                Latitud: ${position.coords.latitude}<br>
                Longitud: ${position.coords.longitude}
            `;
        }, error => {
            console.error('Error getting location:', error);
            const locationInfo = document.getElementById('locationInfo');
            locationInfo.innerHTML = 'Error al obtener la ubicación';
        });
    } else {
        const locationInfo = document.getElementById('locationInfo');
        locationInfo.innerHTML = 'Geolocalización no disponible';
    }
}

// Cambiar entre vistas
function showMainView() {
    document.getElementById('mainView').style.display = 'block';
    document.getElementById('singleView').style.display = 'none';
    stopQRRotation();
}

function showAddView() {
    document.getElementById('mainView').style.display = 'none';
    document.getElementById('singleView').style.display = 'block';
    currentIndex = 0;
    startQRRotation();
}

// Rotar QRs
function startQRRotation() {
    showCurrentQR();
    showLocation();
    
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % qrCodes.length;
        showCurrentQR();
        showLocation();
    }, 5000);
}

function stopQRRotation() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function showCurrentQR() {
    const qrDiv = document.getElementById('currentQR');
    qrDiv.innerHTML = '';
    
    new QRCode(qrDiv, {
        text: qrCodes[currentIndex].data,
        width: 200,
        height: 200
    });
    
    const label = document.createElement('div');
    label.className = 'qr-label';
    label.textContent = qrCodes[currentIndex].id;
    qrDiv.appendChild(label);
}

function toggleSearch() {
    // Implementar función de búsqueda
    alert('Función de búsqueda');
}

// Manejar eventos del ciclo de vida
window.addEventListener('beforeunload', stopQRRotation);