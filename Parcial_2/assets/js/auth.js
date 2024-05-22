const usersKey = 'users';
const sessionKey = 'session';

function hashPassword(password) {
    return btoa(password); // Simple hash usando base64 (sin sal)
}

function getUsers() {
    return JSON.parse(localStorage.getItem(usersKey)) || [];
}

function saveUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
}

function getSession() {
    return localStorage.getItem(sessionKey);
}

function setSession(username) {
    localStorage.setItem(sessionKey, username);
}

function clearSession() {
    localStorage.removeItem(sessionKey);
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const hashedPassword = hashPassword(password);

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === hashedPassword);

    if (user) {
        setSession(username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const hashedPassword = hashPassword(password);

    const users = getUsers();
    if (users.find(user => user.username === username)) {
        alert('El nombre de usuario ya está en uso');
        return;
    }

    users.push({ username, name, password: hashedPassword });
    saveUsers(users);
    alert('Registro exitoso');
    window.location.href = 'index.html';
}

function handleLogout() {
    clearSession();
    window.location.href = 'index.html';
}
