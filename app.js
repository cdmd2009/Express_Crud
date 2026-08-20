
    const { error } = require('console');
const express = require('express');
    const app = express();
    require('dotenv').config();    
    const port = process.env.PORT || 4000;
    //libreria para leer archivos FS (File Sistem)
    const fs = require('fs');
    const ruta = require('path');
    //crear ruta para el archivo de datos
    const rutaArchivoJson = ruta.join(__dirname, 'lista_datos.json') //__dirname trae toda la ruta del proyecto o el directorio
    
    //ruta raiz
    app.get('/', (req, res) => {
        res.send('API RESTFUL - CRUD APRENDICES');
    });

    //endpoint para obtener a todos los aprendices
    app.get('/api/aprendices', (req, res) => {
        fs.readFile(rutaArchivoJson, "utf-8" , (error, datos) => {
            if (error) {
                res.status(500).json({Error: "Error al leer el archivo "})
            }
            listaAprendices = JSON.parse(datos); //parse para convertir los datos a json
            res.json(listaAprendices);
        })
    })

    //Para escuchar el servidor en el puerto especificado
    app.listen(port, () => {
        console.log(`Server :http://localhost:${port}`);
    })
