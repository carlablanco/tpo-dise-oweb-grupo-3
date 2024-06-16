// Importar funciones helper.js si es necesario
// import {
//   getRandomNumber,
//   getDistance,
//   getDistanceHint
// } from './helper';

// Coordenadas de Asia
const ASIA_X = 100; // Ajusta estas coordenadas según tu necesidad
const ASIA_Y = 100; // Ajusta estas coordenadas según tu necesidad
const ASIA_RADIUS = 50; // Ajusta este radio según tu necesidad

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
  }
});

// Función para verificar si un punto está dentro de un círculo
function isWithinCircle(x, y, circleX, circleY, radius) {
  let distance = Math.sqrt((x - circleX) ** 2 + (y - circleY) ** 2);
  return distance <= radius;
}

// Función para obtener una pista de distancia
let getDistanceHint = distance => {
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
