(() => {
    const DashboardModule = {
        htmlElements: {
            transactionForm: document.getElementById('transactionForm'),
            transactionTableBody: document.getElementById('transactionTable').querySelector('tbody'),
            barEntradas: document.getElementById('barEntradas'),
            barSalidas: document.getElementById('barSalidas'),
            menuToggle: document.getElementById('menuToggle'),
            logoutButton: document.getElementById('logoutButton'),
            logoutMenu: document.getElementById('logoutMenu'),
            usernameDisplay: document.getElementById('usernameDisplay')
        },

        init() {
            this.bindEvents();
            this.methods.loadDashboard();
        },

        bindEvents() {
            this.htmlElements.transactionForm.addEventListener('submit', this.handlers.handleTransaction);
            this.htmlElements.logoutButton.addEventListener('click', this.handlers.handleLogout);
            this.htmlElements.logoutMenu.addEventListener('click', this.handlers.handleLogout);
            this.htmlElements.menuToggle.addEventListener('click', this.handlers.toggleMenu);
            document.addEventListener('DOMContentLoaded', this.methods.loadDashboard);
        },

        handlers: {
            handleTransaction(event) {
                event.preventDefault();
                const type = DashboardModule.htmlElements.transactionForm.querySelector('#type').value;
                const amount = parseFloat(DashboardModule.htmlElements.transactionForm.querySelector('#amount').value);

                const transactions = DashboardModule.methods.getTransactions();
                transactions.push({ type, amount });
                DashboardModule.methods.saveTransactions(transactions);

                DashboardModule.methods.updateTransactionTable();
                DashboardModule.methods.updateTransactionChart();
                DashboardModule.htmlElements.transactionForm.reset();
            },

            handleLogout() {
                AuthModule.methods.clearSession(); // Utiliza el método de AuthModule para cerrar sesión
                window.location.href = 'index.html';
            },

            toggleMenu() {
                const menu = document.getElementById('menu');
                menu.classList.toggle('show');
            }
        },

        methods: {
            loadDashboard() {
                const username = AuthModule.methods.getSession(); // Utiliza el método de AuthModule para obtener la sesión
                if (!username) {
                    window.location.href = 'index.html';
                    return;
                }

                // Limpiar datos almacenados al cargar el dashboard
                localStorage.removeItem('transactions');

                DashboardModule.htmlElements.usernameDisplay.textContent = username;
                DashboardModule.methods.updateTransactionTable();
                DashboardModule.methods.updateTransactionChart();
            },

            updateTransactionTable() {
                const transactions = DashboardModule.methods.getTransactions();
                const tbody = DashboardModule.htmlElements.transactionTableBody;
                tbody.innerHTML = '';

                transactions.forEach(transaction => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${transaction.type}</td><td>${transaction.amount}</td>`;
                    tbody.appendChild(tr);
                });
            },

            updateTransactionChart() {
                const transactions = DashboardModule.methods.getTransactions();
                const entradas = transactions.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0);
                const salidas = transactions.filter(t => t.type === 'salida').reduce((sum, t) => sum + t.amount, 0);

                const total = entradas + salidas;
                const entradasPercent = total === 0 ? 0 : (entradas / total) * 100;
                const salidasPercent = total === 0 ? 0 : (salidas / total) * 100;

                DashboardModule.htmlElements.barEntradas.style.height = `${entradasPercent}%`;
                DashboardModule.htmlElements.barEntradas.textContent = `Entradas: ${entradas}`;

                DashboardModule.htmlElements.barSalidas.style.height = `${salidasPercent}%`;
                DashboardModule.htmlElements.barSalidas.textContent = `Salidas: ${salidas}`;
            },

            getTransactions() {
                return JSON.parse(localStorage.getItem('transactions')) || [];
            },

            saveTransactions(transactions) {
                localStorage.setItem('transactions', JSON.stringify(transactions));
            }
        }
    };

    const AuthModule = {
        methods: {
            getSession() {
                return localStorage.getItem('session');
            },

            clearSession() {
                localStorage.removeItem('session');
            }
        }
    };

    DashboardModule.init();
})();
