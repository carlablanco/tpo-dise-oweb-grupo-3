const passwords = [];

function checkPassword() {
    const password = document.getElementById('password').value;
    const result = document.getElementById('password-result');
    let score = 0;


    if (password.length >= 8) score += 10;
    if (password.length >= 15) score += 10;
    if (password.length < 7) score -= 5;
    if (password.length < 3) score -= 5;
    if (password.length === 1) score -= 10;
    if (/\d/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[@$!%*?&#]/.test(password)) score += 20;


    let message = '';
    let color = '';
    if (score >= 90) {
        message = '¡Contraseña muy segura!';
        color = 'green';
    } else if (score >= 70) {
        message = 'Contraseña segura.';
        color = 'yellow';
    } else if (score <= 50) {
        message = 'Contraseña insegura. Intenta mejorarla.';
        color = 'red';
    }

    result.textContent = message;
    result.style.color = color;


    passwords.push({ password, score });
    updatePasswordList();
}

function updatePasswordList() {
    const passwordList = document.getElementById('passwords');
    passwordList.innerHTML = ''; 


    passwords.sort((a, b) => b.score - a.score);

    passwords.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Contraseña: ${item.password} - Seguridad: ${item.score}/100`;

    
        if (item.score >= 90) {
            listItem.style.backgroundColor = 'lightgreen';
        } else if (item.score >= 70) {
            listItem.style.backgroundColor = 'yellow';
        } else {
            listItem.style.backgroundColor = 'lightcoral';
        }

        passwordList.appendChild(listItem);
    });
}
