//se crean las funciones que se van a usar
const jswtoken = require("jsonwebtoken")
const ingresar = require("../services/autenticarService") 
const iniciarSesion = async (req,res) =>{
    const {usuario, clave} = req.body
    const token = ingresar(usuario, clave)
    res.json({token: token})

    // try{
    // } catch (error){
    // }
}
module.exports = iniciarSesion