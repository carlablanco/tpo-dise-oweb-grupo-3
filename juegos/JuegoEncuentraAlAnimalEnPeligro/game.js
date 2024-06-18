const ANIMALES = [
  {
    name: "Pangolín (Manis pentadactyla)",
    x: 2100,  // Coordenada X del centro del círculo en la imagen
    y: 650,   // Coordenada Y del centro del círculo en la imagen
    radius: 100,  // Radio del círculo en la imagen
    image: "img/pangolin.jpeg",  // Ruta de la imagen del animal
    message: "El pangolín (Manis pentadactyla) ubicado en China, está en peligro de extinción debido a la caza y comercio ilegal por sus escamas y carne, así como la pérdida de hábitat; se estima que solo quedan unos 200,000 ejemplares en todo el mundo."  // Mensaje descriptivo del animal
  },
  // Resto de objetos de animales con propiedades similares
];

const WIDTH = 2730;   // Ancho de la imagen del mapa
const HEIGHT = 1426;  // Alto de la imagen del mapa

// Función para calcular la distancia entre el clic del usuario y el centro del círculo del animal
function getDistance(e, target) {
  const rect = e.target.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top;
  let diffX = offsetX - (target.x * (rect.width / WIDTH));
  let diffY = offsetY - (target.y * (rect.height / HEIGHT));
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

// Función para obtener una pista según la distancia al animal
function getDistanceHint(distance) {
  if (distance < 30) {
    return "¡Hirviendo!";
  } else if (distance < 40) {
    return "¡Muy caliente!";
  } else if (distance < 60) {
    return "¡Caliente!";
  } else if (distance < 100) {
    return "¡Tibio!";
  } else if (distance < 180) {
    return "¡Frío!";
  } else if (distance < 360) {
    return "¡Muy frío!";
  } else {
    return "¡Congelado!";
  }
}

// Función para verificar si el clic del usuario está dentro del círculo del animal
function isWithinCircle(x, y, circleX, circleY, radius) {
  let distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
  return distance <= radius;
}

// Variables globales que hacen referencia a elementos del DOM
let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');
let $animalImage = document.querySelector('#animalImage');
let $animalName = document.querySelector('#animalName');
let $startButton = document.querySelector('#startButton');

let clicks = 0;               // Contador de clics
let currentAnimalIndex = 0;   // Índice del animal actual que se está buscando

// Función para iniciar el juego
function startGame() {
  currentAnimalIndex = 0;
  clicks = 0;
  showAnimal(ANIMALES[currentAnimalIndex]);
  $map.addEventListener('click', handleClick);  // Agregar evento de clic al mapa
  $map.addEventListener('mouseover', () => {
    $map.style.cursor = 'url("https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-zoom-in-128.png"), auto';
  });  // Cambiar cursor al hacer hover sobre el mapa
  $map.addEventListener('mouseout', () => {
    $map.style.cursor = 'auto';
  });  // Restaurar cursor al salir del mapa
  $distance.innerHTML = '';   // Limpiar cualquier mensaje anterior en la distancia
  $distance.style.display = 'block';  // Asegurar que el mensaje de distancia esté visible al inicio
}

// Función para mostrar la imagen y nombre del animal actual
function showAnimal(animal) {
  $animalImage.src = animal.image;
  $animalName.textContent = animal.name;
}

// Función que maneja el clic del usuario sobre el mapa
function handleClick(e) {
  clicks++;
  let target = ANIMALES[currentAnimalIndex];
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  const rect = e.target.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top;
  
  // Verificar si el clic está dentro del círculo del animal
  if (isWithinCircle(offsetX, offsetY, target.x * (rect.width / WIDTH), target.y * (rect.height / HEIGHT), target.radius * (rect.width / WIDTH))) {
    // Mostrar mensaje de éxito y detalles del animal encontrado
    alert(`¡Encontraste al ${target.name} en ${clicks} clics!\n${target.message}`);
    clicks = 0;
    currentAnimalIndex++;
    if (currentAnimalIndex < ANIMALES.length) {
      showAnimal(ANIMALES[currentAnimalIndex]);
    } else {
      // Si se han encontrado todos los animales, mostrar mensaje de finalización y limpiar eventos
      alert('¡Has encontrado todos los animales en peligro de extinción!');
      $map.removeEventListener('click', handleClick);
      $map.removeEventListener('mouseover', () => {});
      $map.removeEventListener('mouseout', () => {});
      $distance.style.display = 'none';  // Ocultar el mensaje de distancia al finalizar el juego
    }
  }
}

// Escuchar el clic en el botón de inicio para comenzar el juego
$startButton.addEventListener('click', startGame);
