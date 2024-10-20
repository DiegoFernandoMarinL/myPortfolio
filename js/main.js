const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = document.getElementById('backgroundImage');

// Función para ajustar el tamaño del canvas al cargar y redimensionar
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8; // Ajustar al tamaño deseado
  canvas.height = window.innerHeight * 0.6;

  // Dibujar la imagen de fondo ligeramente oscurecida
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Fondo semioscuro
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Ajustar el tamaño del canvas al cargar la página
backgroundImage.onload = function() {
  resizeCanvas();
};

// Escuchar el evento de redimensionar la ventana
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);

  // Volver a dibujar la imagen de fondo y oscurecerla parcialmente
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Crear el degradado radial para la linterna
  const radius = 50; // Tamaño del foco
  const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
  
  // Mejorar el degradado para un efecto más realista
  gradient.addColorStop(0, 'rgba(255, 255, 200, 0.9)');  // Centro ligeramente amarillo
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)'); // Luz más suave
  gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)'); // Luz desvaneciéndose
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');           // Borde oscuro

  ctx.save();  // Guardar el estado actual del canvas
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);  // Área de la linterna
  ctx.clip();  // Recortar todo lo que esté fuera del círculo

  // Dibujar solo el área visible de la imagen debajo del cursor
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Aplicar el degradado para el efecto de linterna
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.restore();  // Restaurar el estado completo del canvas

  // Ajustar el borde del círculo
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 3; // Grosor del borde reducido
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Borde con opacidad más baja
  ctx.shadowBlur = 100; // Aumentar el desenfoque del borde
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'; // Color de la sombra
  ctx.stroke();
});
