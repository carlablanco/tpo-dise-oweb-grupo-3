$(document).ready(function() {
  // Configurar la lupa una vez que la imagen del mapa se haya cargado completamente
  $('#map img').on('load', function() {
    $(this).imageLens({
      lensSize: 200,
      borderSize: 1,
      borderColor: '#ccc',
      lensShape: 'square',
      cursor: 'crosshair'
    });
  });

  // Función para manejar eventos de mouseover y mouseout del mapa
  $map.addEventListener('mouseover', function() {
    this.style.cursor = 'url("https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-zoom-in-128.png"), auto';
  });

  $map.addEventListener('mouseout', function() {
    this.style.cursor = 'auto';
  });
});

const ANIMALES = [
  {
    name: "Pangolín",
    x: 1500,
    y: 500,
    radius: 300,
    image: "img/pangolin.jpeg",
    message: "El pangolín está en peligro de extinción debido a la caza ilegal y la pérdida de hábitat."
  },
  {
    name: "Lemur",
    x: 1800,
    y: 1000,
    radius: 300,
    image: "img/lemur.jpeg",
    message: "El lemur está en peligro de extinción debido a la caza furtiva y la destrucción de su hábitat."
  },
  {
    name: "Rinoceronte de java en Indonesia",
    x: 2500,
    y: 800,
    radius: 300,
    image: "img/rinoceronte-java.jpg",
    message: "El rinoceronte de Java tiene una población de unos 58-68 rinocerontes, su riesgo de extinción es bastante crítico "
  }
];

const WIDTH = 2730;
const HEIGHT = 1426;

function getDistance(e, target) {
  const rect = e.target.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top;
  let diffX = offsetX - (target.x * (rect.width / WIDTH));
  let diffY = offsetY - (target.y * (rect.height / HEIGHT));
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

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

function isWithinCircle(x, y, circleX, circleY, radius) {
  let distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
  return distance <= radius;
}

let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');
let $animalImage = document.querySelector('#animalImage');
let $animalName = document.querySelector('#animalName');
let $startButton = document.querySelector('#startButton');
let clicks = 0;
let currentAnimalIndex = 0;

function startGame() {
  currentAnimalIndex = 0;
  clicks = 0;
  showAnimal(ANIMALES[currentAnimalIndex]);
  $map.addEventListener('click', handleClick);
  $map.addEventListener('mouseover', () => {
    $map.style.cursor = 'url("https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-zoom-in-128.png"), auto';
  });
  $map.addEventListener('mouseout', () => {
    $map.style.cursor = 'auto';
  });
}

function showAnimal(animal) {
  $animalImage.src = animal.image;
  $animalName.textContent = animal.name;
}

function handleClick(e) {
  clicks++;
  let target = ANIMALES[currentAnimalIndex];
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  const rect = e.target.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top;
  if (isWithinCircle(offsetX, offsetY, target.x * (rect.width / WIDTH), target.y * (rect.height / HEIGHT), target.radius * (rect.width / WIDTH))) {
    alert(`¡Encontraste al ${target.name} en ${clicks} clics!\n${target.message}`);
    clicks = 0;
    currentAnimalIndex++;
    if (currentAnimalIndex < ANIMALES.length) {
      showAnimal(ANIMALES[currentAnimalIndex]);
    } else {
      alert('¡Has encontrado todos los animales en peligro de extinción!');
      $map.removeEventListener('click', handleClick);
      $map.removeEventListener('mouseover', () => {});
      $map.removeEventListener('mouseout', () => {});
    }
  }
}

$startButton.addEventListener('click', startGame);
