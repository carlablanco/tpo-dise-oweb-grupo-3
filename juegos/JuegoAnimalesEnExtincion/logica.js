document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        { name: 'Zebra', image: 'img/zebra.png', endangered: false },
        { name: 'Mandril', image: 'img/mandril.png', endangered: true },
        { name: 'Axolotl', image: 'img/axolotl.png', endangered: true },
        { name: 'Panda', image: 'img/panda.png', endangered: true },
        { name: 'Mono Dorado', image: 'img/mono-dorado.png', endangered: true },
        { name: 'Condor Andino', image: 'img/condor-andino.png', endangered: false },
        { name: 'Carpincho', image: 'img/carpincho.png', endangered: false },
        { name: 'Tero', image: 'img/tero.png', endangered: false },
    ];

    const startButton = document.getElementById('startButton');
    const checkButton = document.getElementById('checkButton');
    const restartButton = document.getElementById('restartButton');
    const animalGrid = document.getElementById('animalGrid');

    function showScreen(screenId) {
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById(screenId).style.display = 'block';
    }

    function initializeGame() {
        checkButton.style.visibility = 'visible';
        restartButton.style.visibility = 'hidden';
        animalGrid.innerHTML = '';
        animals.forEach(animal => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('animal-image-container');
        
            const img = document.createElement('img');
            img.src = animal.image;
            img.alt = animal.name;
            img.title = animal.name;
            const nameSpan = document.createElement('span');
            nameSpan.innerText = animal.name;
            nameSpan.classList.add('animal-name');
            imgContainer.appendChild(nameSpan);
            img.dataset.endangered = animal.endangered;
            img.classList.add('animal-image');

            img.addEventListener('click', function() {
                img.classList.toggle('selected');
            });

            imgContainer.appendChild(img);
            animalGrid.appendChild(imgContainer);
        });
    }

    function getGameResult() {
        const allImages = document.querySelectorAll('.animal-image');
        const selectedImages = document.querySelectorAll('.animal-image.selected');
        let endangeredCount = 0;
        let correctCount = 0;
        let missedAnimals = [];
        let correctAnimals = [];
        let incorrectAnimals = [];
    
        allImages.forEach(img => {
            if (img.dataset.endangered === 'true') {
                endangeredCount++;
                if (!img.classList.contains('selected')) {
                    missedAnimals.push(img.alt); // Asume que el nombre del animal está en el atributo alt de la imagen
                }
            }
        });
    
        selectedImages.forEach(img => {
            if (img.dataset.endangered === 'true') {
                correctCount++;
                correctAnimals.push(img.alt); // Asume que el nombre del animal está en el atributo alt de la imagen
            } else {
                incorrectAnimals.push(img.alt);
            }
        });
    
        let result = `Había ${endangeredCount} animales en peligro de extinción. Seleccionaste ${correctCount} de ellos correctamente.`;
        if (correctAnimals.length > 0) {
            result += ` Los animales correctos son: ${correctAnimals.join(', ')}.`;
        }
        if (incorrectAnimals.length > 0) {
            result += ` Los animales incorrectos son: ${incorrectAnimals.join(', ')}.`;
        }
        if (missedAnimals.length > 0) {
            result += ` Los animales que te perdiste son: ${missedAnimals.join(', ')}.`;
        }
    
        return result;
    }

    startButton.addEventListener('click', () => {
        showScreen('gameScreen');
        initializeGame();
    });

    checkButton.addEventListener('click', () => {
        const selectedImages = document.querySelectorAll('#animalGrid img.selected');
        let correct = 0;
        let correctAnimals = [];
        selectedImages.forEach(img => {
            if (img.dataset.endangered === 'true') {
                img.classList.add('correct');
                correct++;
                correctAnimals.push(img.alt); // Asume que el nombre del animal está en el atributo alt de la imagen
            } else {
                img.classList.add('incorrect');
            }
        });
        checkButton.style.visibility = 'hidden';
        restartButton.style.visibility = 'visible';
        const result = getGameResult();
        document.getElementById('resultText').textContent = result;
        const modal = new bootstrap.Modal(document.getElementById('resultModal'));
        modal.show();
    });

    restartButton.addEventListener('click', () => {
        checkButton.style.visibility = 'visible';
        restartButton.style.visibility = 'hidden';
        showScreen('startScreen');
    });

    showScreen('startScreen');
});
