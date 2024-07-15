// js/registrarEnfermera.js
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const id_personal = document.getElementById('id_personal').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const nivel_estudio = document.getElementById('nivel_estudio').value;
    const tarifa_diurno = document.getElementById('tarifa_diurno').value;
    const tarifa_vespertino = document.getElementById('tarifa_vespertino').value;
    const tarifa_nocturno = document.getElementById('tarifa_nocturno').value;
    const tarifa_hora = document.getElementById('tarifa_hora').value;
    const numero_contacto = document.getElementById('numero_contacto').value;

    try {
        const response = await fetch('/api/registrar-enfermera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, id_personal, correo, contrasena, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto })
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
        alert('An error occurred while registering the nurse.');
    }
});
