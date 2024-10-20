const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Función para ajustar el tamaño del canvas al cargar y redimensionar
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8; // Ajustar al tamaño deseado
  canvas.height = window.innerHeight * 0.6;

  // Llenar el canvas con una capa oscura cuando no se está usando el cursor
  ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Oscurecer completamente
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Ajustar el tamaño del canvas al cargar la página
backgroundImage.onload = function() {
  resizeCanvas(); // Ajustar el canvas una vez que la imagen está cargada
};

// Escuchar el evento de redimensionar la ventana
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  // Limpiar el canvas, pero dejarlo oscuro
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Crear el efecto de linterna (área visible)
  ctx.save();  // Guardar el estado actual del canvas
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, 2 * Math.PI);  // Ajusta el radio para el efecto de linterna
  ctx.clip();  // Recortar todo lo que esté fuera del círculo

  // Dibujar solo el área visible de la imagen debajo del cursor
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.restore();  // Restaurar el estado completo del canvas
});
