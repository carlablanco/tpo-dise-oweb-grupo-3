let currentImage = 0;
let gameStarted = false;

const images = [
    {
        src: './imagenesJuego/imagen1.jpg',
        description: '¡Felicidades! Has identificado una de las principales causas que ponen en peligro a los animales en extinción. La contaminación tiene un impacto devastador, afectando tanto a los animales acuáticos como a los terrestres, quienes son los más vulnerables.',
        targetX: 10,
        targetY: 60,
        toleranceX: 7,
        toleranceY: 7
    },
    {
        src: './imagenesJuego/imagen2.jpg',
        description: '¡Correcto! Has adivinado, la caza es una de las principales amenazas que afectan a las poblaciones de animales. Esta práctica reduce drásticamente su número y pone en peligro su supervivencia, alterando el equilibrio de los ecosistemas y llevando a muchas especies al borde de la extinción.',
        targetX: 15,
        targetY: 70,
        toleranceX: 10,
        toleranceY: 10
    },
    {
        src: './imagenesJuego/img3.jpg',
        description: 'Has adivinado correctamente. La presencia humana en los ecosistemas puede tener un impacto drástico en los animales, alterando sus hábitats naturales, afectando sus patrones de comportamiento y amenazando su supervivencia.',
        targetX: 25.5,
        targetY: 65,
        toleranceX: 5,
        toleranceY: 10
    },
    {
        src: './imagenesJuego/imagenF.jpg',
        description: 'CUIDEMOS A LOS ANIMALES!',
        targetX: 0,
        targetY: 0,
        toleranceX: 100,
        toleranceY: 100
    }
];

window.onload = function() {
    startGame();
};

document.getElementById('clickArea').addEventListener('click', function(event) {
    if (!gameStarted) return;

    const rect = event.target.getBoundingClientRect();
    const currentTarget = images[currentImage];

    const targetX = currentTarget.targetX * rect.width / 100;
    const targetY = currentTarget.targetY * rect.height / 100;
    const toleranceX = currentTarget.toleranceX * rect.width / 100;
    const toleranceY = currentTarget.toleranceY * rect.height / 100;

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (Math.abs(clickX - targetX) <= toleranceX && Math.abs(clickY - targetY) <= toleranceY) {
        showMessage(currentTarget.description);
    }
});

function startGame() {
    gameStarted = true;
    document.getElementById('gameImage').src = images[currentImage].src;
    updateRemainingImages();
}

function nextImage() {
    currentImage++;
    if (currentImage < images.length) {
        const nextImage = images[currentImage];
        document.getElementById('gameImage').src = nextImage.src;
        updateRemainingImages();
    } else {
        window.location.href = "../../juegos.html";
    }
}

function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerHTML = `<p>${message}</p><button onclick="closeMessage()">Siguiente</button>`;
    messageBox.style.display = 'block';
}

function closeMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
    nextImage();
}

function updateRemainingImages() {
    const remainingImages = images.length - currentImage - 1;
    const remainingImagesBox = document.getElementById('remainingImages');
    remainingImagesBox.innerHTML = `Imágenes restantes: ${remainingImages}`;
    remainingImagesBox.style.display = 'block';
}

function restartGame() {
location.reload();
}

function exitGame() {
    window.location.href = '../../juegos.html';
}