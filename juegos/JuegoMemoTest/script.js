const animalDescriptions = {
    'cardenal_amarillo.jpg': 'El Cardenal amarillo es un ave que se encuentra mayormente en Argentina, extendiéndose por una amplia región desde el norte al centro de nuestro país. Se estima que el tamaño poblacional total de la especie varía entre 1500 y 3000 individuos silvestres.',
    'cauquen_colorado.jpeg': 'Es un ave migratoria que habita en la región el patagónica de Argentina y Chile y, que entre mayo y septiembre viaja hasta el sur de la provincia de Buenos Aires, donde tiene su área de invernada. Actualmente se halla en peligro de extinción, siendo su población estimada inferior a 900 individuos.',
    'delfin_franciscana.jpg': 'La franciscana o delfín del Plata es uno de los delfines más pequeños y más raros del mundo: mide entre 1.30 y 1.75 m de largo. Su principal amenaza es la pesca incidental, siendo anualmente causal de la muerte de unos 500 a 800 delfines.',
    'escalandrun.avif': 'El Escalandrún es una de las especies de tiburones más populares del Mar Argentino, aunque en los últimos 40 años su población se redujo un 90%. Entre los principales factores que fomentan su lenta desaparición, están la pesca deportiva y comercial, aunque por supuesto la destrucción del ecosistema en general también contribuye a su extinción.',
    'maca_tobiano.jpg': 'El Macá Tobiano es un ave acuática que habita solamente en la Patagonia argentina. Las sequías, los depredadores y la falta de consideración por parte de los humanos son algunos de los factores que influyen a su cercana extinción.',
    'ranita_del_pehuenche.jpg': 'La Ranita del Pehuenche es una especie de anfibio que se encuentra en los Andes de Argentina. Este anfibio tarda cuatro años en llegar a la adultez, a diferencia de cualquier rana que crece en unas pocas semanas. La mayor amenaza de la ranita es la construcción de rutas que afecta su hábitat.',
    'tapir.png': 'El Tapir es un mamífero americano que ha sucumbido de a poco por causa del ser humano, puesto que eran altamente cazados por la utilidad de sus duras pieles. En el mundo, sólo quedan 5 especies de tapir, 4 de ellas esparcidas por América.',
    'venado_de_las_pampas.jpeg': 'El venado de las pampas, también conocido como “ciervo pampero, venado pampero o ciervo campero”,  es un pequeño cérvido cuya población bonaerense se encuentra en peligro de extinción. En la actualidad la provincia de Buenos Aires cuenta con una población de aproximadamente 150 a 200 individuos',
    'yaguarete.jpg': 'El yaguareté, declarado Monumento Natural de Argentina, es una especie en peligro de extinción, víctima de la caza ilegal y la pérdida de hábitat, entre otras amenazas. Se estima que su población actual es de alrededor de 250 individuos adultos.'
};

const images = [
    'cardenal_amarillo.jpg', 'cardenal_amarillo.jpg',
    'cauquen_colorado.jpeg', 'cauquen_colorado.jpeg',
    'delfin_franciscana.jpg', 'delfin_franciscana.jpg',
    'escalandrun.avif', 'escalandrun.avif',
    'maca_tobiano.jpg', 'maca_tobiano.jpg',
    'ranita_del_pehuenche.jpg', 'ranita_del_pehuenche.jpg',
    'tapir.png', 'tapir.png',
    'venado_de_las_pampas.jpeg', 'venado_de_las_pampas.jpeg',
    'yaguarete.jpg', 'yaguarete.jpg'
];

function getAnimalName(imageSrc) {
    const animalNames = {
        'cardenal_amarillo.jpg': 'Cardenal Amarillo',
        'cauquen_colorado.jpeg': 'Cauquén Colorado',
        'delfin_franciscana.jpg': 'Delfín Franciscana',
        'escalandrun.avif': 'Escalandrún',
        'maca_tobiano.jpg': 'Macá Tobiano',
        'ranita_del_pehuenche.jpg': 'Ranita del Pehuenche',
        'tapir.png': 'Tapir',
        'venado_de_las_pampas.jpeg': 'Venado de las Pampas',
        'yaguarete.jpg': 'Yaguareté'
    };

    return animalNames[imageSrc.split('/').pop()];
}

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const animalModal = $('#animalModal');
    const celebrationModal = $('#celebrationModal');
    const animalModalLabel = document.getElementById('animalModalLabel');
    const animalImage = document.getElementById('animalImage');
    const animalDescription = document.getElementById('animalDescription');
    const restartButton = document.getElementById('restartButton');
    const homeButton = document.getElementById('homeButton');
    const restartButtonFinal = document.getElementById('restartButtonFinal');
    const homeButtonFinal = document.getElementById('homeButtonFinal');

    images.sort(() => 0.5 - Math.random());

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchesFound = 0;
    let animalesEncontrados = [];
    let intentos = 0;

    images.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const img = document.createElement('img');
        img.src = `images/${image}`;

        cardBack.appendChild(img);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameContainer.appendChild(card);

        card.addEventListener('click', () => {
            if (lockBoard) return;
            animalSeleccionado = card.querySelector('.card-back img').src;
            if (animalesEncontrados.includes(animalSeleccionado)) return;
            if (card === firstCard) return;

            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;
            lockBoard = true;

            checkForMatch();
        });
    });

    restartButton.addEventListener('click', () => {
        location.reload();
    });

    homeButton.addEventListener('click', () => {
        window.location.href = '../../juegos.html';
    });

    restartButtonFinal.addEventListener('click', () => {
        location.reload();
    });

    homeButtonFinal.addEventListener('click', () => {
        window.location.href = '../../juegos.html';
    });

    function checkForMatch() {
        primerAnimal = firstCard.querySelector('.card-back img').src;
        segundoAnimal = secondCard.querySelector('.card-back img').src;
        const isMatch = primerAnimal === segundoAnimal;
        
        intentos++;
        document.getElementById('message').innerText = `Intentos: ${intentos}`;
    
        if (isMatch) {
            matchesFound++;
            const animalName = getAnimalName(firstCard.querySelector('.card-back img').src);
            const animalDesc = animalDescriptions[firstCard.querySelector('.card-back img').src.split('/').pop()];
    
            animalModalLabel.textContent = `¡Felicidades! Has encontrado al ${animalName}.`;
            animalImage.src = firstCard.querySelector('.card-back img').src;
            animalDescription.textContent = animalDesc;
    
            animalesEncontrados.push(primerAnimal);
            animalesEncontrados.push(segundoAnimal);
            animalModal.modal('show');
    
            animalModal.on('hidden.bs.modal', () => {
                if (matchesFound === images.length / 2) {
                    document.getElementById('attemptsCount').textContent = intentos;
                    celebrationModal.modal('show');
                }
            });
    
            disableCards();
        } else {
            unflipCards();
        }
    }
    
    function disableCards() {
        resetBoard();
    }
    
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
    
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
});