// 1. Importamos Express y el módulo 'path'
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 2. Servimos todo lo que esté en la carpeta "public" como archivos estáticos
//    (index.html, buscador.html, style.css, script.js, images/...)
//    Gracias a esto, http://localhost:3000/  y  http://localhost:3000/buscador.html
//    funcionan automáticamente, sin necesitar una ruta especial.
app.use(express.static(path.join(__dirname, 'public')));

// 3. Ruta dinámica: captura un número al final de la URL
//    Ejemplo: http://localhost:3000/25  ->  req.params.id = "25"
//    Esta ruta SOLO se activa si no hubo coincidencia con un archivo estático arriba.
app.get('/:id', (req, res) => {
    const id = req.params.id;

    // Validamos que sea un número (si no lo es, respondemos con error 404)
    if (!/^\d+$/.test(id)) {
        return res.status(404).send('Página no encontrada.');
    }

    // Reenviamos la MISMA página de inicio (index.html).
    // El navegador seguirá mostrando "/25" en la barra de direcciones,
    // y será script.js quien lea ese número y muestre la carta.
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});