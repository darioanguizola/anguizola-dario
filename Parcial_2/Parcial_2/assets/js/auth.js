(() => {
    const AuthModule = {
        keys: {
            users: 'users',
            session: 'session',
        },

        htmlElements: {
            loginForm: document.getElementById('loginForm'),
            registerForm: document.getElementById('registerForm'),
            usernameInput: document.getElementById('username'),
            passwordInput: document.getElementById('password'),
            nameInput: document.getElementById('name'),
            logoutButton: document.getElementById('logoutButton'),
        },

        init() {
            this.bindEvents();
        },

        bindEvents() {
            if (this.htmlElements.loginForm) {
                this.htmlElements.loginForm.addEventListener('submit', this.handlers.handleLogin);
            }
            if (this.htmlElements.registerForm) {
                this.htmlElements.registerForm.addEventListener('submit', this.handlers.handleRegister);
            }
            if (this.htmlElements.logoutButton) {
                this.htmlElements.logoutButton.addEventListener('click', this.handlers.handleLogout);
            }
            window.addEventListener('load', this.handlers.checkSession);
        },

        handlers: {
            handleLogin(event) {
                event.preventDefault();
                const username = AuthModule.htmlElements.usernameInput.value;
                const password = AuthModule.htmlElements.passwordInput.value;
                AuthModule.methods.login(username, password);
            },

            handleRegister(event) {
                event.preventDefault();
                const username = AuthModule.htmlElements.usernameInput.value;
                const name = AuthModule.htmlElements.nameInput ? AuthModule.htmlElements.nameInput.value : '';
                const password = AuthModule.htmlElements.passwordInput.value;
                AuthModule.methods.register(username, name, password);
            },

            handleLogout() {
                AuthModule.methods.logout();
            },

            checkSession() {
                if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('profile.html')) {
                    AuthModule.methods.verifySession();
                }
            }
        },

        methods: {
            hashPassword(password) {
                return btoa(password); // Simple hash using base64 (without salt)
            },

            getUsers() {
                return JSON.parse(localStorage.getItem(AuthModule.keys.users)) || [];
            },

            saveUsers(users) {
                localStorage.setItem(AuthModule.keys.users, JSON.stringify(users));
            },

            getSession() {
                return localStorage.getItem(AuthModule.keys.session);
            },

            setSession(username) {
                localStorage.setItem(AuthModule.keys.session, username);
            },

            clearSession() {
                localStorage.removeItem(AuthModule.keys.session);
            },

            login(username, password) {
                const hashedPassword = this.hashPassword(password);
                const users = this.getUsers();
                const user = users.find(user => user.username === username && user.password === hashedPassword);

                if (user) {
                    this.setSession(username);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            },

            register(username, name, password) {
                const hashedPassword = this.hashPassword(password);
                const users = this.getUsers();

                if (users.find(user => user.username === username)) {
                    alert('El nombre de usuario ya está en uso');
                    return;
                }

                const customRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
                if (!customRegex.test(password)) {
                    alert('Contraseña insegura');
                    return;
                }

                users.push({ username, name, password: hashedPassword });
                this.saveUsers(users);
                alert('Registro exitoso');
                window.location.href = 'index.html';
            },

            logout() {
                this.clearSession();
                window.location.href = 'index.html';
            },

            verifySession() {
                const session = this.getSession();
                if (!session) {
                    window.location.href = 'index.html';
                } else {
                    document.getElementById('usernameDisplay').textContent = session;
                }
            }
        }
    };

    AuthModule.init();
})();