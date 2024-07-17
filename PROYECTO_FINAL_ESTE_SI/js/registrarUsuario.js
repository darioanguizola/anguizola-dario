// public/js/registrarUsuario.js
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido=document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const numero_contacto=document.getElementById('numero_contacto').value;
    const contrasena = document.getElementById('contrasena').value;

    try {
        const response = await fetch('/api/registrar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, correo, contrasena,numero_contacto})
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = 'index.html';
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error('Fetch error:', err);
        alert('An error occurred while registering the user.');
    }
});
document.getElementById('logoutButton').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirige al usuario a la página de inicio de sesión
});
document.getElementById('Contactus').addEventListener('click', () => {
    window.location.href = 'Aboutus.html'; // Redirige al usuario a la página de inicio de sesión
});
