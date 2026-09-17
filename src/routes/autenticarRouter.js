const {Router} = require("express")

const enrutador = Router()

const iniciarSesion = require("../controllers/autenticarController")

//estas funciones se van a pasar al controlador 
enrutador.post("/login", iniciarSesion);

enrutador.post("/registro", (req,res) =>{
    res.json({mensaje:"ruta de registro"})
})

module.exports = enrutador