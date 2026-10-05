//se crean las funciones que se van a usar
const ingresar = require("../services/autenticarService") 
const listarUsuarios = async (req,res) =>{
    res.json({mensaje:"lista de usuarios"})
}
module.exports = listarUsuarios