(() => {
    const ProfileModule = {
        htmlElements: {
            profileForm: document.getElementById('profileForm'),
            nameInput: document.getElementById('name'),
            passwordInput: document.getElementById('password'),
            menuToggle: document.getElementById('menuToggle'),
            logoutButton: document.getElementById('logoutButton'),
            logoutMenu: document.getElementById('logoutMenu')
        },

        init() {
            this.bindEvents();
            this.methods.loadProfile();
        },

        bindEvents() {
            this.htmlElements.profileForm.addEventListener('submit', this.handlers.handleProfileUpdate);
            this.htmlElements.logoutButton.addEventListener('click', this.handlers.handleLogout);
            this.htmlElements.logoutMenu.addEventListener('click', this.handlers.handleLogout);
            this.htmlElements.menuToggle.addEventListener('click', this.handlers.toggleMenu);
        },

        handlers: {
            handleProfileUpdate(event) {
                event.preventDefault();
                const username = AuthModule.methods.getSession(); // Utiliza el método de AuthModule para obtener la sesión
                if (!username) {
                    window.location.href = 'index.html';
                    return;
                }

                const name = ProfileModule.htmlElements.nameInput.value;
                const password = ProfileModule.htmlElements.passwordInput.value;
                const users = AuthModule.methods.getUsers(); // Utiliza el método de AuthModule para obtener los usuarios
                const user = users.find(user => user.username === username);

                user.name = name;
                if (password) {
                    const customRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
                    if (!customRegex.test(password)) {
                        alert('Contraseña insegura');
                        return;
                    }
                    user.password = AuthModule.methods.hashPassword(password); // Utiliza el método de AuthModule para hashear la contraseña
                }

                AuthModule.methods.saveUsers(users); // Utiliza el método de AuthModule para guardar los usuarios
                alert('Perfil actualizado');
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
            loadProfile() {
                const username = AuthModule.methods.getSession(); // Utiliza el método de AuthModule para obtener la sesión
                if (!username) {
                    window.location.href = 'index.html';
                    return;
                }

                const users = AuthModule.methods.getUsers(); // Utiliza el método de AuthModule para obtener los usuarios
                const user = users.find(user => user.username === username);

                ProfileModule.htmlElements.nameInput.value = user.name;
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
            },

            getUsers() {
                return JSON.parse(localStorage.getItem('users')) || [];
            },

            saveUsers(users) {
                localStorage.setItem('users', JSON.stringify(users));
            },

            hashPassword(password) {
                return btoa(password); // Simple hash usando base64 (sin sal)
            }
        }
    };

    ProfileModule.init();
})();
