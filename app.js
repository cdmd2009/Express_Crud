    require('dotenv').config();

    const express = require('express');
    const app = express();
    const port = process.env.PORT || 4000;
    
    //ruta raiz
    app.get('/', (req, res) => {
        res.send('API RESTFUL - CRUD APRENDICES');
    });

    //endpoint para obtener a todos los aprendices

    //Para escuchar el servidor en el puerto especificado
    app.listen(port, () => {
        console.log(`Server :http://localhost:${port}`);
    })
