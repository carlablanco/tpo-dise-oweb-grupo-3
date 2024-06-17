const ANIMALES = [
  {
    name: "Pangolín (Manis pentadactyla)",
    x: 2100,
    y: 650,
    radius: 100,
    image: "img/pangolin.jpeg",
    message: "El pangolín (Manis pentadactyla) ubicado en China, está en peligro de extinción debido a la caza y comercio ilegal por sus escamas y carne, así como la pérdida de hábitat; se estima que solo quedan unos 200,000 ejemplares en todo el mundo."
  },
  {
    name: "Lemur",
    x: 1760,
    y: 1075,
    radius: 100,
    image: "img/lemur.jpeg",
    message: "El lemur ubicado en Madagascar, está en peligro de extinción debido a la deforestación, la caza furtiva y la pérdida de hábitat; se estima que quedan aproximadamente 2,000 ejemplares."
  },
  {
    name: "Rinoceronte de java",
    x: 2350,
    y: 1000,
    radius: 100,
    image: "img/rinoceronte-java.jpg",
    message: "El rinoceronte de Java ubicado en Indonesia, tiene una población de unos 58-68 rinocerontes, su riesgo de extinción es bastante crítico."
  },
  {
    name: "Tamarino multicolor",
    x: 2500,
    y: 900,
    radius: 100,
    image: "img/tamarino-multicolor.jpg",
    message: "El tamarino multicolor es originario de Panamá y algunas regiones del noroeste de Colombia. Está en peligro debido a la pérdida de hábitat y la caza furtiva."
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
  $distance.innerHTML = '';  // Limpiar cualquier mensaje anterior
  $distance.style.display = 'block';  // Asegurarse de que el mensaje esté visible al inicio
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
      $distance.style.display = 'none';  // Ocultar el mensaje al finalizar el juego
    }
  }
}

$startButton.addEventListener('click', startGame);
