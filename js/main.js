const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Función para ajustar el tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Redimensiona al cargar la imagen de fondo
backgroundImage.onload = resizeCanvas;
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  // Volver a dibujar la imagen de fondo y oscurecerla
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

  // Detectar si el cursor está en las esquinas
  const cornerSize = 100;  // Tamaño del área de detección en las esquinas
  if (x < cornerSize && y < cornerSize) {
    // Esquina superior izquierda
    triggerRouteTransition('/ruta-esquina-superior-izquierda');
  } else if (x > canvas.width - cornerSize && y < cornerSize) {
    // Esquina superior derecha
    triggerRouteTransition('/ruta-esquina-superior-derecha');
  } else if (x < cornerSize && y > canvas.height - cornerSize) {
    // Esquina inferior izquierda
    triggerRouteTransition('/ruta-esquina-inferior-izquierda');
  } else if (x > canvas.width - cornerSize && y > canvas.height - cornerSize) {
    // Esquina inferior derecha
    triggerRouteTransition('/ruta-esquina-inferior-derecha');
  }
});

// Función para aplicar el efecto de transición suave y redirigir
function triggerRouteTransition(route) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = route;
  }, 500); // Esperar a que se complete el efecto de desvanecimiento
}
