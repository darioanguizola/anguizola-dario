document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            // Guardar userId en localStorage
            localStorage.setItem('numeroContacto', result.numeroContacto);
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('emailUsuario', result.email);
            

            // Redirigir según tipo_usuario
            if (result.tipo_usuario === true) {
                window.location.href = 'profile.html';
            } else {
                window.location.href = 'Listado-enfermeras.html';
            }
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error('Fetch error:', err);
        alert('An error occurred while logging in.');
    }
});
