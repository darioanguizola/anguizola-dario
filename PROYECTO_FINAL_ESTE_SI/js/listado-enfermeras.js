document.addEventListener('DOMContentLoaded', async () => {
    let enfermeras = [];
    
    const emailUsuario = localStorage.getItem('emailUsuario'); // Recupera el correo del usuario desde localStorage
    const numeroContacto  = localStorage.getItem('numeroContacto '); // Recupera el número de contacto del usuario desde localStorage
  


    const fetchEnfermeras = async () => {
        try {
            const response = await fetch('/api/enfermeras'); // Endpoint donde obtienes las enfermeras
            const result = await response.json();

            if (result.success) {
                enfermeras = result.data;
                renderEnfermeras(enfermeras);
            } else {
                console.error('Error al obtener la lista de enfermeras');
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const renderEnfermeras = (enfermeras) => {
        const contenedor = document.getElementById('enfermerasList');
        contenedor.innerHTML = '';

        enfermeras.forEach(enfermera => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-enfermera');
            
            const nombre = document.createElement('h3');
            nombre.textContent = `${enfermera.nombre} ${enfermera.apellido}`;
            
            const tarifa = document.createElement('p');
            tarifa.textContent = `Tarifa por hora: $${enfermera.tarifa_hora.toFixed(2)}`;

            const tarifa_diurno = document.createElement('p');
            tarifa_diurno.textContent = `Turno Diurno: $${enfermera.tarifa_diurno.toFixed(2)}`;

            const tarifa_vespertino = document.createElement('p');
            tarifa_vespertino.textContent = `Turno Vespertino: $${enfermera.tarifa_vespertino.toFixed(2)}`;

            const tarifa_nocturno = document.createElement('p');
            tarifa_nocturno.textContent = `Turno Nocturno: $${enfermera.tarifa_nocturno.toFixed(2)}`;

            const numeroEnfermera = document.createElement('p');
            numeroEnfermera.textContent = `Contacto: ${enfermera.numeroEnfermera}`;

            const nivelEstudio = document.createElement('p');
            nivelEstudio.textContent = `Nivel de estudio: ${enfermera.nivel_estudio}`;

            const button = document.createElement('button');
            button.textContent = 'Enviar solicitud';
            button.classList.add('btn', 'btn-primary');
            button.addEventListener('click', () => enviarSolicitud(emailUsuario, enfermera.correo));

            tarjeta.appendChild(nombre);
            tarjeta.appendChild(tarifa);
            tarjeta.appendChild(tarifa_diurno);
            tarjeta.appendChild(tarifa_vespertino);
            tarjeta.appendChild(tarifa_nocturno);
            tarjeta.appendChild(numeroEnfermera);
            tarjeta.appendChild(nivelEstudio);
            tarjeta.appendChild(button);

            contenedor.appendChild(tarjeta);
        });
    };

 
    const applyFilters = () => {
        const searchName = document.getElementById('searchName').value.toLowerCase();
        const filterLevel = document.getElementById('nivel_estudio').value.toLowerCase();

        const filteredEnfermeras = enfermeras.filter(enfermera => {
            const nameMatch = `${enfermera.nombre} ${enfermera.apellido}`.toLowerCase().includes(searchName);
            const levelMatch = filterLevel === '' || enfermera.nivel_estudio.toLowerCase() === filterLevel;
            return nameMatch && levelMatch;
        });

        if (!searchName && !filterLevel) {
            renderEnfermeras(enfermeras);
        } else {
            renderEnfermeras(filteredEnfermeras);
        }
    };

     // Función para enviar solicitud
     const enviarSolicitud = async (emailUsuario, emailEnfermera, numeroContacto) => {
        
        alert(emailUsuario);
        alert(emailEnfermera);
        try {
            const response = await fetch('/api/enviar-solicitud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailUsuario, emailEnfermera, numeroContacto})
            });
            const result = await response.json();

            if (result.success) {
                alert('Solicitud enviada exitosamente');
            } else {
                alert('Error al enviar la solicitud');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al enviar la solicitud');
        }
    };

    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirige al usuario a la página de inicio de sesión
    });

    document.getElementById('Contactus').addEventListener('click', () => {
        window.location.href = 'Aboutus.html'; // Redirige al usuario a la página de inicio de sesión
    });

    

    await fetchEnfermeras(); // Llama a fetchEnfermeras cuando se carga la página para mostrar todas las enfermeras

    const carouselImages = document.querySelectorAll('#carouselExampleIndicators .carousel-item img');
    const redirectUrl = 'https://www.hospitalsanfernando.com/en/';

    carouselImages.forEach(image => {
        image.addEventListener('click', () => {
            window.open(redirectUrl, '_blank');
        });
    });
});
