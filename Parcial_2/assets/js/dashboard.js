function loadDashboard() {
    const username = getSession();
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    // Limpiar datos almacenados al cargar el dashboard
    localStorage.removeItem('transactions');

    document.getElementById('usernameDisplay').textContent = username;
    updateTransactionTable();
    updateTransactionChart();
}

function handleTransaction(event) {
    event.preventDefault();
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const transactions = getTransactions();
    transactions.push({ type, amount });
    saveTransactions(transactions);

    updateTransactionTable();
    updateTransactionChart();
    document.getElementById('transactionForm').reset();
}

function updateTransactionTable() {
    const transactions = getTransactions();
    const tbody = document.getElementById('transactionTable').querySelector('tbody');
    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${transaction.type}</td><td>${transaction.amount}</td>`;
        tbody.appendChild(tr);
    });
}

function updateTransactionChart() {
    const transactions = getTransactions();
    const entradas = transactions.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0);
    const salidas = transactions.filter(t => t.type === 'salida').reduce((sum, t) => sum + t.amount, 0);

    const total = entradas + salidas;
    const entradasPercent = total === 0 ? 0 : (entradas / total) * 100;
    const salidasPercent = total === 0 ? 0 : (salidas / total) * 100;

    document.getElementById('barEntradas').style.height = `${entradasPercent}%`;
    document.getElementById('barEntradas').textContent = `Entradas: ${entradas}`;

    document.getElementById('barSalidas').style.height = `${salidasPercent}%`;
    document.getElementById('barSalidas').textContent = `Salidas: ${salidas}`;
}

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', loadDashboard);
document.getElementById('transactionForm').addEventListener('submit', handleTransaction);
document.getElementById('logoutButton').addEventListener('click', handleLogout);
document.getElementById('logoutMenu').addEventListener('click', handleLogout);
document.getElementById('menuToggle').addEventListener('click', toggleMenu);
