// Importar funciones helper.js si es necesario
// import {
//   getRandomNumber,
//   getDistance,
//   getDistanceHint
// } from './helper';

// Coordenadas de Asia
const ASIA_X = 1500; // Ajusta estas coordenadas según la ubicación de Asia en tu mapa
const ASIA_Y = 500;  // Ajusta estas coordenadas según la ubicación de Asia en tu mapa
const ASIA_RADIUS = 300; // Ajusta este radio según tu necesidad

// Coordenadas del mapa
const WIDTH = 2730;  // Ancho del mapa
const HEIGHT = 1426; // Altura del mapa

let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGHT)
};

// click handler
let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');
let clicks = 0;

$map.addEventListener('click', function (e) {
  console.log('click');
  clicks++;
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  // Verificar si el clic está dentro de las coordenadas de Asia
  let isWithinAsia = isWithinCircle(e.offsetX, e.offsetY, ASIA_X, ASIA_Y, ASIA_RADIUS);

  if (isWithinAsia) {
    alert(`¡Encontraste al pangolín en Asia en ${clicks} clics!`);
    location.reload();
  } else if (distance < 20) {
    alert(`Found the treasure in ${clicks} clicks!`);
    location.reload();
  }
});

// Función para verificar si un punto está dentro de un círculo
function isWithinCircle(x, y, circleX, circleY, radius) {
  let distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
  return distance <= radius;
}

// Función para obtener un número aleatorio
function getRandomNumber(size) {
  return Math.floor(Math.random() * size);
}

// Función para obtener la distancia entre dos puntos
function getDistance(e, target) {
  let diffX = e.offsetX - target.x;
  let diffY = e.offsetY - target.y;
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

// Función para obtener una pista de distancia
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
    return "¡Frio!";
  } else if (distance < 360) {
    return "¡Muy frio!";
  } else {
    return "¡Congelado!";
  }
}
