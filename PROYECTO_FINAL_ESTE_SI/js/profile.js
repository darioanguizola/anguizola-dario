document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('No se ha encontrado el ID de usuario. Por favor, inicie sesión de nuevo.');
        window.location.href = 'index.html';
        return;
    }

    async function fetchUserData() {
        try {
            const response = await fetch(`/api/usuario/${userId}`);
            const result = await response.json();

            if (result.success) {
                const user = result.data;
                document.getElementById('id').value = user.id;
                document.getElementById('nombre').value = user.nombre || '';
                document.getElementById('apellido').value = user.apellido || '';
                document.getElementById('id_personal').value = user.id_personal || '';
                document.getElementById('correo').value = user.correo || '';
                document.getElementById('contrasena').value = user.contrasena || '';
                document.getElementById('nivel_estudio').value = user.nivel_estudio || '';
                document.getElementById('tarifa_diurno').value = user.tarifa_diurno || '';
                document.getElementById('tarifa_vespertino').value = user.tarifa_vespertino || '';
                document.getElementById('tarifa_nocturno').value = user.tarifa_nocturno || '';
                document.getElementById('tarifa_hora').value = user.tarifa_hora || '';
                document.getElementById('numero_contacto').value = user.numero_contacto || '';
            } else {
                alert('Error al obtener los datos del usuario.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            alert('An error occurred while fetching the user data.');
        }
    }

    fetchUserData();

    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value || null;
        const apellido = document.getElementById('apellido').value || null;
        const id_personal = document.getElementById('id_personal').value || null;
        const correo = document.getElementById('correo').value || null;
        const contrasena = document.getElementById('contrasena').value || null;
        const nivel_estudio = document.getElementById('nivel_estudio').value || null;
        const tarifa_diurno = document.getElementById('tarifa_diurno').value || null;
        const tarifa_vespertino = document.getElementById('tarifa_vespertino').value || null;
        const tarifa_nocturno = document.getElementById('tarifa_nocturno').value || null;
        const tarifa_hora = document.getElementById('tarifa_hora').value || null;
        const numero_contacto = document.getElementById('numero_contacto').value || null;

        try {
            const response = await fetch('/api/actualizar-enfermera', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre, apellido, id_personal, correo, contrasena, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto })
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
            alert('An error occurred while updating the user data.');
        }
    });
});
document.getElementById('logoutButton').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirige al usuario a la página de inicio de sesión
});

document.getElementById('Contactus').addEventListener('click', () => {
    window.location.href = 'Aboutus.html'; // Redirige al usuario a la página de inicio de sesión
});
