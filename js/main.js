const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Función para ajustar el tamaño del canvas sin perder el área raspada
function resizeCanvas() {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height); // Guardar el estado actual del canvas

  // Ajustar las dimensiones del canvas al tamaño de la ventana
  canvas.width = window.innerWidth * 0.8; // O cualquier tamaño relativo a la ventana
  canvas.height = window.innerHeight * 0.6;

  // Cubrir el canvas con un color (simula la tarjeta de raspado)
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Volver a colocar el contenido anterior en el canvas
  ctx.putImageData(data, 0, 0);
}

// Ajustar el tamaño del canvas al cargar la página
resizeCanvas();

// Escuchar el evento de redimensionar la ventana y reajustar el canvas sin borrar el contenido
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect(); // Obtener la nueva posición del canvas
  const x = (e.clientX - rect.left) * (canvas.width / rect.width); // Escalar correctamente
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  ctx.globalCompositeOperation = 'destination-out'; // Hace el área transparente
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI); // Define el área raspada
  ctx.fill();
});
