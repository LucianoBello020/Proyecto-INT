// server.js
const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para agregar un evento
app.post('/add-event', (req, res) => {
    const { fecha, mensaje } = req.body;
    const eventos = JSON.parse(fs.readFileSync('./data/events.json'));
    eventos.push({ fecha, mensaje });
    fs.writeFileSync('./data/events.json', JSON.stringify(eventos));
    res.send({ message: 'Evento agregado exitosamente!' });
});

// Tarea programada para verificar notificaciones cada minuto
cron.schedule('* * * * *', () => {
    const eventos = JSON.parse(fs.readFileSync('./data/events.json'));
    const ahora = new Date();

    eventos.forEach((evento, index) => {
        const fechaEvento = new Date(evento.fecha);
        if (ahora >= fechaEvento) {
            console.log(`Notificación: ${evento.mensaje}`);
            eventos.splice(index, 1); // Elimina el evento ya notificado
            fs.writeFileSync('./data/events.json', JSON.stringify(eventos));
        }
    });
});

// Inicia el servidor y muestra la URL en la consola
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
