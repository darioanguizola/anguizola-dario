document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Verificación de credenciales (simulada)
      if (username === 'usuario' && password === 'contraseña') {
        // Iniciar sesión
        localStorage.setItem('isLoggedIn', true);
        window.location.replace('home.html');
      } else {
        // Mostrar mensaje de error
        alert('Credenciales incorrectas');
      }
    });
  });
  