function loadProfile() {
    const username = getSession();
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    const users = getUsers();
    const user = users.find(user => user.username === username);

    document.getElementById('name').value = user.name;
}

function handleProfileUpdate(event) {
    event.preventDefault();
    const username = getSession();
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find(user => user.username === username);

    user.name = name;
    if (password) {
        user.password = hashPassword(password);
    }

    saveUsers(users);
    alert('Perfil actualizado');
}

function handleLogout() {
    clearSession();
    window.location.href = 'index.html';
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}