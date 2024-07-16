require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { sql, connectToDatabase } = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../')));

// transporter SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Conexions a la BD
connectToDatabase();

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});
//////////////RUTAS/////////////////////////


// Ruta para validar el login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await sql.query`SELECT id, correo, numero_contacto, tipo_usuario FROM Usuarios WHERE correo = ${email} AND contrasena = ${password}`;
        const user = result.recordset[0];

        if (user) {
            res.status(200).json({
                success: true,
                userId: user.id,
                email: user.correo,
                numeroContacto: user.numero_contacto,
                tipo_usuario: user.tipo_usuario,
            });
        } else {
            res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Ruta para registrar una enfermera
app.post('/api/registrar-enfermera', async (req, res) => {
    const { nombre, apellido, id_personal, correo, contrasena, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto } = req.body;
    const tipo_usuario = 1; // Tipo usuario 1 para enfermera

    try {
        await sql.query`INSERT INTO Usuarios (nombre, apellido, id_personal, correo, contrasena, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto, tipo_usuario) VALUES (${nombre}, ${apellido}, ${id_personal}, ${correo}, ${contrasena}, ${nivel_estudio}, ${tarifa_diurno}, ${tarifa_vespertino}, ${tarifa_nocturno}, ${tarifa_hora}, ${numero_contacto}, ${tipo_usuario})`;
        res.status(201).json({ success: true, message: 'Enfermera registrada exitosamente' });
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Ruta para registrar un usuario normal
app.post('/api/registrar-usuario', async (req, res) => {
    const { nombre, apellido, correo, contrasena, numero_contacto } = req.body;
    const tipo_usuario = 0; // Tipo usuario 0 para usuario normal

    const camposOpcionales = {
        id_personal: req.body.id_personal || null,
        nivel_estudio: req.body.nivel_estudio || null,
        tarifa_diurno: req.body.tarifa_diurno || null,
        tarifa_vespertino: req.body.tarifa_vespertino || null,
        tarifa_nocturno: req.body.tarifa_nocturno || null,
        tarifa_hora: req.body.tarifa_hora || null,
        numero_contacto: req.body.numero_contacto || null,
    };

    try {
        await sql.query`
            INSERT INTO Usuarios (nombre, apellido, correo, contrasena, tipo_usuario, id_personal, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto)
            VALUES (${nombre}, ${apellido}, ${correo}, ${contrasena}, ${tipo_usuario}, ${camposOpcionales.id_personal}, ${camposOpcionales.nivel_estudio}, ${camposOpcionales.tarifa_diurno}, ${camposOpcionales.tarifa_vespertino}, ${camposOpcionales.tarifa_nocturno}, ${camposOpcionales.tarifa_hora}, ${numero_contacto})
        `;
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Ruta para actualizar los datos de la enfermera
app.put('/api/actualizar-enfermera', async (req, res) => {
    const { id, nombre, apellido, id_personal, correo, contrasena, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, tarifa_hora, numero_contacto } = req.body;

    try {
        await sql.query`
            UPDATE Usuarios
            SET 
                nombre = ${nombre || null}, 
                apellido = ${apellido || null}, 
                id_personal = ${id_personal || null}, 
                correo = ${correo || null}, 
                contrasena = ${contrasena || null}, 
                nivel_estudio = ${nivel_estudio || null}, 
                tarifa_diurno = ${tarifa_diurno || null}, 
                tarifa_vespertino = ${tarifa_vespertino || null}, 
                tarifa_nocturno = ${tarifa_nocturno || null}, 
                tarifa_hora = ${tarifa_hora || null}, 
                numero_contacto = ${numero_contacto || null}
            WHERE id = ${id} AND tipo_usuario = 1
        `;
        res.status(200).json({ success: true, message: 'Datos actualizados exitosamente' });
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Ruta para obtener los datos del usuario
app.get('/api/usuario/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await sql.query`SELECT * FROM Usuarios WHERE id = ${userId}`;
        if (result.recordset.length > 0) {
            res.status(200).json({ success: true, data: result.recordset[0] });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Ruta para obtener la lista de enfermeras
app.get('/api/enfermeras', async (req, res) => {
    try {
        const result = await sql.query`SELECT id, nombre, apellido, tarifa_hora, nivel_estudio, tarifa_diurno, tarifa_vespertino, tarifa_nocturno, correo, numero_contacto FROM Usuarios WHERE tipo_usuario = 1`;

        const enfermeras = result.recordset.map(row => ({
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            tarifa_hora: row.tarifa_hora,
            nivel_estudio: row.nivel_estudio,
            tarifa_diurno: row.tarifa_diurno,
            tarifa_vespertino: row.tarifa_vespertino,
            tarifa_nocturno: row.tarifa_nocturno,
            correo: row.correo,
            numeroEnfermera: row.numero_contacto,
        }));

        res.status(200).json({ success: true, data: enfermeras });
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Database query failed' });
    }
});

// Función para obtener los horarios de una enfermera
async function getHorarios(enfermeraId) {
    try {
        const result = await sql.query`SELECT turno_tipo FROM Turnos WHERE enfermera_id = ${enfermeraId}`;
        return result.recordset.map(row => row.turno_tipo);
    } catch (err) {
        console.error('Error al obtener horarios:', err);
        return [];
    }
}

// Ruta para enviar solicitud a una enfermera
app.post('/api/enviar-solicitud', async (req, res) => {
    try {
    const { emailUsuario, emailEnfermera, numeroContacto } = req.body;
    
    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: ""+emailEnfermera+"",
        subject: 'Solicitud de Servicio SSED',
            text: `Buenas estimada enfermera,
A través de la plataforma de SSED ha recibido una solicitud del usuario ${emailUsuario}.
Número de contacto: ${numeroContacto}. Favor ponerse en contacto con el usuario si le interesa. Muchas gracias.`,
        });

        res.status(200).json({ success: true, message: 'Correo enviado exitosamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
});


// Crear un nuevo pedido
app.post('/api/orders', async (req, res) => {
    const cart = req.body.cart;

    const order = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '5.00' // precio
            }
        }]
    };

    try {
        const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const data = await response.json();
        res.status(201).json(data);
    } catch (err) {
        console.error('PayPal order creation error:', err);
        res.status(500).json({ success: false, message: 'Failed to create PayPal order' });
    }
});

// Capturar un pedido existente
app.post('/api/orders/:orderID/capture', async (req, res) => {
    const { orderID } = req.params;

    try {
        const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        res.status(200).json(data);
        alert("OK")
    } catch (err) {
        alert("error")
        console.error('PayPal order capture error:', err);
        res.status(500).json({ success: false, message: 'Failed to capture PayPal order' });
    }
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
