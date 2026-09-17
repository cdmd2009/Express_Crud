//archivo donde se definen las rutas y se agrupan
const {Router} = require("express") //se coloca entre llaves porque es un objeto 
const pruebaRouter = require("./pruebaRouter") //importa el router de prueba
const enrutador = Router()

//uso de enrutador
enrutador.use("/rutaprueba", pruebaRouter) 
module.exports = enrutador

