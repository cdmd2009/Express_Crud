const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT || 3111;
//body-parser
app.use(express.json())

//libreria para leer archivo
const sistemaArchivo = require('fs');
const ruta = require('path');
//generar una ruta para el archivo aprendices.json
const rutaArchivoJson = ruta.join(__dirname, 'lista_datos.json');
//ruta raiz
const { validateAprendizData} = require('./validaciones');
app.get('/', (req, res) => {
    res.send('API RESTFUL - CRUD Aprendices');
});

//endpoint para obtener todos los aprendices
app.get('/api/aprendices', (req, res) => {
    //const listaAprendices = []
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conxion bd" })
        }
        const listaAprendices = JSON.parse(datos);
        res.json(listaAprendices);
    });
});

//endpoint para obtener un aprendiz por dni
app.get("/api/aprendices/:dni", (req, res) => {
    const dni = parseInt(req.params.dni)
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conxion bd" })
        }
        const listaAprendices = JSON.parse(datos);
        const aprendiz = listaAprendices.find(a => a.dni === dni)
        if (!aprendiz) {
            return res.status(404).json({ mensaje: "Aprendiz no encontrado" })
        }
        res.json(aprendiz)
    })
})

//endpoint crear un aprendiz
app.post("/api/aprendices", (req, res) => {
    const { nombre, apellido, edad, correo, avatar } = req.body;
    const validation = validateAprendizData(nombre, edad, correo);
    if (!validation.valid) {
        return res.status(400).json({ mensaje: validation.message });
    }
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conxion bd" })
        }
        let listaAprendices = JSON.parse(datos);
        // Calcular nuevo DNI automático
        let nuevoDni = 1;
        if (listaAprendices.length > 0) {
            const maxDni = Math.max(...listaAprendices.map(a => a.dni));
            nuevoDni = maxDni + 1;
        }
        //adicionar a la lista el nuevo aprendiz
        listaAprendices.push({ 
            dni: nuevoDni,
            nombre, 
            apellido: apellido || "", 
            edad: parseInt(edad), 
            correo, 
            avatar: avatar || "img/default.jpg" 
        })
        //adicionar al archivo el nuevo aprendiz
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices,null, 2),(error)=>{
            if(error){
                return res.status(500).json({Error: "No se puede registrar el aprendiz."})
            }
            res.status(201).json({ mensaje: "Aprendiz creado", aprendiz: listaAprendices[listaAprendices.length - 1] })
        })
        
    })
})

//Endpoint para editar un aprendiz
app.put("/api/aprendices/:dni", (req, res)=>{
    const dni = parseInt(req.params.dni)
    const datosAprendiz = req.body
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conxion bd" })
        }
        let listaAprendices = JSON.parse(datos);
        //modificar datos de un aprendiz

        listaAprendices = listaAprendices.map(aprendiz => {
                return aprendiz.dni === dni ? {...aprendiz, ...datosAprendiz } : aprendiz
            })
        //adicionar al archivo el nuevo aprendiz
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices,null, 2),(error)=>{
            if(error){
                return res.status(500).json({Error: "No se puede registrar el aprendiz."})
            }
            res.json(datosAprendiz)
        })
        
    })
})
//Endpoint para eliminar un aprendiz
app.delete("/api/aprendices/:dni", (req, res) => {
    const dni = parseInt(req.params.dni)
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conxion bd" })
        }
        let listaAprendices = JSON.parse(datos);
        const index = listaAprendices.findIndex(a => a.dni === dni)
        if (index === -1) {
            return res.status(404).json({ mensaje: "Aprendiz no encontrado" })
        }
        listaAprendices.splice(index, 1)
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se pudo eliminar el aprendiz." })
            }
            res.json({ mensaje: "Aprendiz eliminado correctamente" })
        })
    })
})

// Modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`)
})