const ANIMALES = [
  {
    name: "Pangolín",
    x: 1500,
    y: 500,
    radius: 300,
    image: "../../img/pangolin.jpeg",
    message: "El pangolín está en peligro de extinción debido a la caza ilegal y la pérdida de hábitat."
  },
  {
    name: "Lemur",
    x: 1600,
    y: 550,
    radius: 300,
    image: "../../img/lemur.jpeg",
    message: "El lemur está en peligro de extinción debido a la caza furtiva y la destrucción de su hábitat."
  },
  {
    name: "Rinoceronte",
    x: 1300,
    y: 800,
    radius: 300,
    image: "../../img/rhino.jpg",
    message: "El rinoceronte está en peligro de extinción debido a la caza ilegal por sus cuernos."
  }
];

const WIDTH = 2730;
const HEIGHT = 1426;

function getDistance(e, target) {
  const rect = e.target.getBoundingClientRect();
  let diffX = e.clientX - rect.left - target.x;
  let diffY = e.clientY - rect.top - target.y;
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
}

function showAnimal(animal) {
  $animalImage.src = animal.image;
  $animalName.textContent = animal.name;
}

function handleClick(e) {
  clicks++;
  let target = ANIMALES[currentAnimalIndex];
  let distance = getDistance(e, target);
  console.log(distance); // Agrega esta línea
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  if (isWithinCircle(e.offsetX, e.offsetY, target.x, target.y, target.radius)) {
    alert(`¡Encontraste al ${target.name} en ${clicks} clics!\n${target.message}`);
    clicks = 0;
    currentAnimalIndex++;
    if (currentAnimalIndex < ANIMALES.length) {
      showAnimal(ANIMALES[currentAnimalIndex]);
    } else {
      alert('¡Has encontrado todos los animales en peligro de extinción!');
      $map.removeEventListener('click', handleClick);
    }
  }
}


$startButton.addEventListener('click', startGame);
