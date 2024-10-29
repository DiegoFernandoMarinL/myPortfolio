const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

backgroundImage.onload = resizeCanvas;
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const radius = 50;
    const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const cornerSize = 100;
    if (x < cornerSize && y < cornerSize) {
        triggerRouteTransition('view/aboutme.html');
    } else if (x > canvas.width - cornerSize && y < cornerSize) {
        triggerRouteTransition('view/studies.html');
    } else if (x < cornerSize && y > canvas.height - cornerSize) {
        triggerRouteTransition('view/experience.html');
    } else if (x > canvas.width - cornerSize && y > canvas.height - cornerSize) {
        triggerRouteTransition('view/projects.html');
    }
});

function triggerRouteTransition(route) {
    const currentPage = document.querySelector('.page-container.active');
    if (currentPage) {
        currentPage.classList.remove('active');
    }

    document.body.classList.add('fade-out');

    setTimeout(() => {
        loadPage(route);
    }, 1500);
}

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('.page-container') ? 
                doc.querySelector('.page-container').outerHTML : 
                `<div class="page-container">${doc.body.innerHTML}</div>`;

            const existingContainer = document.querySelector('.page-container');
            if (existingContainer) {
                existingContainer.remove();
            }

            document.body.insertAdjacentHTML('beforeend', content);

            setTimeout(() => {
                document.body.classList.remove('fade-out');
                const newContainer = document.querySelector('.page-container');
                newContainer.classList.add('active');
            }, 50);

            setupBackButton();
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.body.classList.remove('fade-out');
        });
}

function setupBackButton() {
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            const container = document.querySelector('.page-container');
            container.classList.remove('active');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.page-container')) {
        document.querySelector('.page-container').classList.add('active');
    }
    resizeCanvas();
});